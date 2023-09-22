import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAnnoncesDto {

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    categorie: string;

    @IsDate()
    @IsOptional()
    dateCreation: Date;

    @IsDate()
    @IsOptional()
    date: Date;

    @IsString()
    @IsOptional()
    image: string;

    // voir quoi mettre pour userId
    // @IsOptional()
    // userId: string;

}