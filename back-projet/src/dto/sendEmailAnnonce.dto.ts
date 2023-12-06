import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendEmailAnnonceDto {
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailSender: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailTarget: string
    
    @IsString()
    @IsNotEmpty()
    message: string

    @IsString()
    @IsNotEmpty()
    title: string

}