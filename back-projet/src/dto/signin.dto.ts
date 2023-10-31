import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SigninDto {
    
@IsString()
@IsNotEmpty()
@IsEmail()
email: string

@IsString()
@IsNotEmpty()
@MinLength(3)
password: string

}