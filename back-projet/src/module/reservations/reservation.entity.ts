
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { Length } from 'class-validator';
import { OfficesEntity } from '../office/office.entity';

@Entity('reservations')
export class ReservationsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'date',
    nullable: false
   })
  date: Date;

  @ManyToOne( //plusieurs réservations peuvent appartenir à un seul bureau
    () => OfficesEntity, 
    office => office.reservations)
  office: OfficesEntity;
  
  @ManyToOne( //plusieurs réservations peuvent appartenir à un seul user
  type => UsersEntity,
  user => user.id,
  { nullable: true })
  user: UsersEntity; //userId dans bdd


}