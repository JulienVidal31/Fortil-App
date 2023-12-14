import { Controller, Post, Param, Body, Delete, UnauthorizedException } from '@nestjs/common';
import { ReservationsEntity } from './reservation.entity';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Post(':userId/reserve/:officeId')
  async reserveOffice(
    @Param('userId') userId: number,
    @Param('officeId') officeId: number,
    @Body('date') date: Date,
  ): Promise<ReservationsEntity> {
    return this.reservationService.reserveOffice(userId, officeId, date);
  }

  @Delete(':userId/cancel/:reservationId')
  async cancelReservation(
    @Param('userId') userId: number,
    @Param('reservationId') reservationId: number,
  ) {
    try {
      return this.reservationService.cancelReservation(userId, reservationId);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    // return this.reservationService.cancelReservation(reservationId, userId);

  }

}