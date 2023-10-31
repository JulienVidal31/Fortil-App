import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class ResetPasswordConfirmationDto {
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    password: string

    @IsNotEmpty()
    code: string

}