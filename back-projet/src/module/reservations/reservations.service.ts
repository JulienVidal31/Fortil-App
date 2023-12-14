import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficesEntity } from '../office/office.entity';
import { UsersEntity } from '../users/users.entity';
import { ReservationsEntity } from './reservation.entity';
import { IsISO4217CurrencyCode } from 'class-validator';

@Injectable()
export class ReservationsService {

    constructor(
        @InjectRepository(OfficesEntity)
        private officeRepository: Repository<OfficesEntity>,
        @InjectRepository(ReservationsEntity)
        private reservationRepository: Repository<ReservationsEntity>,
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
      ) {}

      async reserveOffice(userId: number, officeId: number, date: Date): Promise<ReservationsEntity> {
        const office = await this.officeRepository.findOne({
            where: { id: officeId },
            relations: { reservations: true },
        })
        // console.log('office :', office)
        if (!office) {
          throw new NotFoundException('Bureau non trouvé');
        }
    
        const user = await this.userRepository.findOne({ where: {id: userId} });
        if (!user) {
          throw new NotFoundException('Utilisateur non trouvé');
        }
        // console.log('user :', user)

        const existingReservation = office.reservations.find(reservation => reservation.date === date);
        if (existingReservation) {
          throw new ConflictException("Ce bureau est déjà réservé pour cette date")
        }
    
        const reservation = new ReservationsEntity();
        reservation.date = date;
        reservation.office = office;
        reservation.user = user;
        // console.log('reservation :', reservation)

        return this.reservationRepository.save(reservation);
      }

    async cancelReservation(userId: number, reservationId: number) {
        const reservation = await this.reservationRepository.findOne({
            where: {id: reservationId},
            relations: { user: true },
         });
        if (!reservation) {
            throw new NotFoundException('Réservation non trouvée');
        }

        //controle existance user
        const user = await this.userRepository.findOne({ where: {id: userId} });
        if (!user) {
          throw new NotFoundException('Utilisateur non trouvé');
        }

        //controle que la réservation à supprimé a bien été créée par l'utilisateur qui veut la supprimer
        if (reservation.user.id != userId) {
            throw new UnauthorizedException("Utilisateur non autorisé à dé-réserver ce bureau");
        }

        return this.reservationRepository.delete(reservation.id);
    }

}
