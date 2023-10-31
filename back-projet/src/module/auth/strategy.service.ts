import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";

type Payload = {
    sub: number,
    email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
            ignoreExpiration: true
        })
    }

    async validate(payload: Payload) {
        //Vérif si user déjà créé
        const user = await this.usersService.isEmailExists(payload.email)
        if (!user) {throw new UnauthorizedException("Unauthorized")}
        // Reflect.deleteProperty(user, "password") //suppr propriété password
        // console.log(user)
        return user
    }

}
