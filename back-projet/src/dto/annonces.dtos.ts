import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateAnnonceDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    categorie: string;

    @IsDate()
    @IsNotEmpty()
    dateCreation: Date;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsString()
    image: string;

    // voir si besoin de mettre qq chose --> fait dans userDto ?
    // @IsNotEmpty()
    // user: number;

}