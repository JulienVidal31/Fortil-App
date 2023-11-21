import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users.dtos';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { MailerService } from '../mailer/mailer.service';
import { SigninDto } from 'src/dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDemandDto } from 'src/dto/resetPasswordDemand.dto';
import * as speakeasy from "speakeasy";
import { ResetPasswordConfirmationDto } from 'src/dto/resetPasswordConfirmation.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly mailerService: MailerService,
        private readonly JwtService: JwtService
    ) {}

    async signup(signupDto: CreateUserDto) {
        //Vérif si user déjà créé
        const user = await this.usersService.isEmailExists(signupDto.email)
        if (user) {throw new ConflictException("User already existing")}
        //Hasher mdp
        const passwordHash = await bcrypt.hash(signupDto.password, 10)
        signupDto.password = passwordHash
        //Save user dans bdd
        // console.log(signupDto)
        await this.usersService.addUser(signupDto)
        //Envoyer email de confirmation
        await this.mailerService.sendSignupConfirmation(signupDto.email)
        //Retourner réponse de succès
        return (`User ${signupDto.email} succefully created`)
    }

    async signin(signinDto: SigninDto) {
        //Vérif si user déjà inscrit
        const user = await this.usersService.isEmailExists(signinDto.email)
        if (!user) {throw new NotFoundException("User not found")}
        //Comparer le mdp
        const match = await bcrypt.compare(signinDto.password, user.password)
        if(!match) {throw new UnauthorizedException("Password don't match")}
        //Retourner un token jwt
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        }
        const token = this.JwtService.sign(payload, {expiresIn: "30d", secret: process.env.SECRET_KEY})
        return {
            status: 201,
            token,
            user: {
                username: `${user.name} ${user.lastName}`,
                email: user.email
            }
        }
    }

    async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
        //Vérif si user déjà inscrit
        const user = await this.usersService.isEmailExists(resetPasswordDemandDto.email)
        if (!user) {throw new NotFoundException("User not found")}
        const code = speakeasy.totp({
            secret: process.env.OTP_CODE,
            digits: 5,
            step: 60 * 15, //valable 60s x 15 -> 15min
            encoding: "base32"
        })
        const url = "http://localhost:4200/reset-password" //METTRE ICI URL FRONT QD INTERFACE PRETE - lien de redirection pour reinit password
        await this.mailerService.sendResetPassword(user.email, url, code)
        return ("Reset password mail has been sent")
    }

    async resetPasswordConfirmation(resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        //Vérif si user déjà inscrit
        const user = await this.usersService.isEmailExists(resetPasswordConfirmationDto.email)
        if (!user) {throw new NotFoundException("User not found")}
        const match = speakeasy.totp.verify({
            secret: process.env.OTP_CODE,
            token: resetPasswordConfirmationDto.code,
            digits: 5,
            step: 60 * 15, //valable 60s x 15 -> 15min
            encoding: "base32"
        })
        if(!match) {throw new UnauthorizedException("Invalid/expired token")}
        const passwordHash = await bcrypt.hash(resetPasswordConfirmationDto.password, 10)
        user.password = passwordHash
        await this.usersService.updateUser(user.id, user)
        return ("Password updated")
    }

    async deleteAccount(userToDelete: SigninDto) {
        //Vérif si user déjà inscrit
        const user = await this.usersService.isEmailExists(userToDelete.email)
        if (!user) {throw new NotFoundException("User not found")}
        //Comparer le mdp
        const match = await bcrypt.compare(userToDelete.password, user.password)
        if(!match) {throw new UnauthorizedException("Password don't match")}
        await this.usersService.deleteUser(+user.id)
        return (`Account of ${user.email} deleted`)
    }

}
