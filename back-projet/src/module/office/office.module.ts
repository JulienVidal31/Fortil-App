import { Module } from '@nestjs/common';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { OfficesEntity } from './office.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsEntity } from '../reservations/reservation.entity';
import { UsersEntity } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfficesEntity, ReservationsEntity, UsersEntity]),],
  controllers: [OfficeController],
  providers: [OfficeService]
})
export class OfficeModule {}
