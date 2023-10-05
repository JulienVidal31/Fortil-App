import { AnnoncesEntity } from 'src/module/annonces/annonces.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'varchar', length: 50 }) //unique
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