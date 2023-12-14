import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsEntity } from './reservation.entity';
import { UsersEntity } from '../users/users.entity';
import { OfficesEntity } from '../office/office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationsEntity,OfficesEntity,UsersEntity]),],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})  
export class ReservationsModule {}
