import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDemandDto {
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

}