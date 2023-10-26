import { AnnoncesEntity } from 'src/module/annonces/annonces.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany( //un user peut etre associé à plusieurs annonces
  type => AnnoncesEntity,
  annonces => annonces.id)
  annonces: AnnoncesEntity[];


}