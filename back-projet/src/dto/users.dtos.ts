import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

@IsString()
@IsNotEmpty()
@MinLength(3)
name: string;

@IsString()
@IsNotEmpty()
@MinLength(3)
lastName: string;

@IsString()
@IsNotEmpty()
@IsEmail()
email: string;

@IsString()
@IsNotEmpty()
@MinLength(3)
password: string;

@IsString()
@IsNotEmpty()
role: string;

}