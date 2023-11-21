import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

    // @IsDate() //A NE PAS METTRE CAR AUTOMATIQUE
    // dateCreation: Date;

    // @IsDate() //sinon beug
    // @IsOptional()
    // date: Date;

    @IsString()
    image: string;

    // voir si besoin de mettre qq chose --> fait dans userDto ?
    // @IsNotEmpty()
    // user: number;

}