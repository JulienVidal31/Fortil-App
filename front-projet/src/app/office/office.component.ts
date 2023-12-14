import { Component, OnInit } from '@angular/core';
import { OfficeService } from './office.service';
import { Office } from './office.interface';
import { AuthService } from '../auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Reservations } from './reservation.interface';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  selectedDate: Date;
  officesList!: Office[]

  constructor(
    private officeService: OfficeService,
    private authService: AuthService,
    private msg: NzMessageService,
  ) {
    this.selectedDate = new Date() // Initialisez la valeur du datapicker avec la date du jour
  }

  ngOnInit() {
    this.officeService.getOffices()
    .subscribe(officesList => {
      this.officesList = officesList;
      // console.log(this.officesList)
    })
  }

  refreshOfficeList() {
    this.officeService.getOffices()
    .subscribe(officesList => {
      this.officesList = officesList;
      // console.log(this.officesList)
    })
  }

  isReserved(officeId: number, date: Date) {
    // console.log(date.toISOString().split('T')[0]) //test
    const office = this.officesList.find(office => office.id === officeId)
    // console.log(office?.reservations) //test
      const isReserved = office?.reservations.some((reservations) => reservations.date === date.toISOString().split('T')[0])
      // console.log(isReserved) //test
      return isReserved
  }

  reservedBy(reservationsList: Reservations[], date: Date) {
    const reservationId: Reservations | undefined = reservationsList.find((reservations) => reservations.date === date.toISOString().split('T')[0])
    if(reservationId) {
      return `${reservationId?.user.name} ${reservationId?.user.lastName}`
    }
    return false
  }

  findReservationId(date: Date, officeId: number) {
    const office = this.officesList.find(office => office.id === officeId)
    // console.log(office)
    const reservation: any = office?.reservations.find((reservations: { date: string }) => reservations.date === date.toISOString().split('T')[0])
    // console.log(reservation.id)
    return reservation.id
  }

  //cette fonction permet de réserver ET déréserver des bureaux
  reserveOffice(date: Date, officeId: number) {
    // console.log(officeId) //test
    const dateFormate = date.toISOString().split('T')[0]
    // console.log(dateFormate)
    const token: string | null = this.authService.getToken()
    const userId = this.authService.decodeToken(token).id
    // console.log(userId) //test
    const reservation = {
      date: dateFormate
    }
    // console.log(reservation) //test

    if(!this.isReserved(officeId, date)) { //SI BUREAU PAS RESERVE
      this.officeService.createReservation(reservation, userId, officeId).subscribe(
        (response) => {
          if (response.status === 409) {this.msg.error(`Bureau déjà réservé...`)}
          else {
            this.msg.success(`Bureau réservé avec succès !`)
            this.refreshOfficeList()
          }
        }
      )
    } 
    else { //SI BUREAU RESERVE (souhait de déréserver)
      const reservationId = this.findReservationId(date, officeId)
      // console.log(reservationId)
      this.officeService.cancelReservation(userId, reservationId).subscribe(
        (response) => {
          if (response.status === 401) {this.msg.error(`Vous n'êtes pas autorisé à supprimer cette réservation...`)}
          else {
            this.msg.success(`Réservation annulée avec succès !`)
            this.refreshOfficeList()
          }
        }
      )
    }

  }



  
}
