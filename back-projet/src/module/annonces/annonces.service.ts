import { Injectable, NotFoundException } from '@nestjs/common';
import { AnnoncesEntity } from './annonces.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnnonceDto } from 'src/dto/annonces.dtos';
import { UpdateAnnoncesDto } from 'src/dto/updateAnnonces.dtos';
import { MailerService } from '../mailer/mailer.service';
import { SendEmailAnnonceDto } from 'src/dto/sendEmailAnnonce.dto';


@Injectable()
export class AnnoncesService {

    constructor(
        @InjectRepository(AnnoncesEntity)
        private annoncesRepository: Repository<AnnoncesEntity>,
        private readonly mailerService: MailerService,
    ) 
    {}

    async getAnnonces(): Promise<AnnoncesEntity[]> {
        // return await this.annoncesRepository.find({
        //     relations: ['user']
        // })
        return await this.annoncesRepository
        .createQueryBuilder('annonces')
        .leftJoinAndSelect('annonces.user', 'user')
        .select(['annonces.title', 'annonces.description', 'annonces.categorie', 'annonces.dateCreation', 'annonces.date', 'annonces.image', 'user.name', 'user.lastName', 'user.email']) // Sélectionnez les champs que vous souhaitez
        .orderBy('annonces.dateCreation', 'DESC')
        .getMany();
    }
    
    async getAnnoncesByUserId(id: number): Promise<AnnoncesEntity[]> {
        return await this.annoncesRepository.find({
            where: {
                user: {
                    id: id,
                },
            },
            order: {
                dateCreation: 'DESC' // Tri par date de création, 'DESC' pour trier du plus récent au plus ancien
            }
        })
    }

    async getAnnonceById(id: number): Promise<AnnoncesEntity> {
        const annonce = await this.annoncesRepository.findOneBy({
                id: id,
        })
        if(!annonce) {
            throw new NotFoundException(`cet id ${id} annonce n'existe pas`)
        }
        return annonce
    }

    async addAnnonce(newAnnonce: CreateAnnonceDto): Promise<AnnoncesEntity> {
        return await this.annoncesRepository.save(newAnnonce)
    }

    async updateAnnonce(id: number, Annonce: UpdateAnnoncesDto): Promise<AnnoncesEntity> {
        const newAnnonce = await this.annoncesRepository.preload({
            id, //sélectionne l'id de l'annonce à maj
            ...Annonce //récup les anciennes valeurs de l'annonce à maj
        })
        if(! newAnnonce) {
            throw new NotFoundException(`cet id ${id} annonce n'existe pas`)
        }
        return await this.annoncesRepository.save(newAnnonce)
    }

    //méthode utilisée x fois par la suite pour récup id annonce + gestion d'erreur
    async findAnnonceById(id: number) {
        const annonce = await this.annoncesRepository.findOneBy({
            id: id // where id is your column name
        })
        if(!annonce) {
            throw new NotFoundException(`cet id ${id} annonce n'existe pas`)
        }
        return annonce
    }

    async deleteAnnonce(id: number) {
        const annonceToDelete = await this.findAnnonceById(id)
        return this.annoncesRepository.delete(annonceToDelete.id)
    }

    async softDeleteAnnonce(id: number) {
        await this.findAnnonceById(id) //pour gestion erreur mais pas besoin de récup const avec methode softDelete      
        return this.annoncesRepository.softDelete(id) //cette méthode requiert une col @DeleteDateColumn() dans l'entité en question
    }

    async restoreAnnonce(id: number) {
        return this.annoncesRepository.restore(id) //cette méthode requiert une col @DeleteDateColumn() dans l'entité en question
    }

    async sendEmailAnnonce(emailData: SendEmailAnnonceDto) {
        // console.log(emailData) //test
        await this.mailerService.sendEmailAnnonce(emailData.emailSender, emailData.emailTarget, emailData.message, emailData.title)
        return ("Email send with success")
    }

}

