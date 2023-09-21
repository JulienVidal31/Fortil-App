import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsOptional() // IsEmpty de AddClientDto devient IsOptional car maj de pas forcément tous les éléments
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    role: string;
}