
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { Length } from 'class-validator';
import { ReservationsEntity } from '../reservations/reservation.entity';

@Entity('offices')
export class OfficesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'boolean',
    nullable: false
  })
  assign: boolean;
  
  @Column({ 
    type: 'boolean',
    nullable: false
  })
  withScreen: boolean;
  
  @OneToMany( //un bureau peut être associé à plusieurs réservations
    () => ReservationsEntity,
    reservation => reservation.office)
  reservations: ReservationsEntity[];

}