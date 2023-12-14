import { AnnoncesEntity } from 'src/module/annonces/annonces.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ReservationsEntity } from '../reservations/reservation.entity';

@Entity('users')
export class UsersEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar',
    length: 30,
    // transformer: //julien --> Julien
   })
  name: string;

  @Column({ 
    type: 'varchar',
    length: 30,
  // transformer: //vidal --> VIDAL
   })
  lastName: string;

  // @Column({ 
  //   type: 'varchar',
  //   length: 30,
  //  })
  // address: string;

  @Column({ 
    type: 'varchar',
    length: 80,
    unique: true,
    // transformer: //Julien.vidal@fortil.group --> julien.vidal@fortil.group
   })
  email: string;

  @Column({ type: 'varchar' }) //a crypter
  password: string;

  @Column({ type: 'varchar' })
  role: string;

  @CreateDateColumn()
  dateCreation: Date;

  @UpdateDateColumn()
  dateModification: Date;
  
  @OneToMany( //un user peut etre associé à plusieurs annonces
  type => AnnoncesEntity,
  annonces => annonces.id)
  annonces: AnnoncesEntity[];

  @OneToMany( //un user peut etre associé à plusieurs réservations
  type => ReservationsEntity,
  reservations => reservations.id)
  reservations: ReservationsEntity[];

}