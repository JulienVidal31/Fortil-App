import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficesEntity } from './office.entity';
import { ReservationsEntity } from '../reservations/reservation.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class OfficeService {

    constructor(
        @InjectRepository(OfficesEntity)
        private officeRepository: Repository<OfficesEntity>,
        @InjectRepository(ReservationsEntity)
        private reservationRepository: Repository<ReservationsEntity>,
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
    ) {}

    async getAllOffices(): Promise<OfficesEntity[]> {
        return this.officeRepository.find({ relations: ['reservations', 'reservations.user'] }); //VOIR ICI POUR RECUP AUSSI USER
    }

}
