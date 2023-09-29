import { UsersEntity } from 'src/users/users.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('annonces')
export class AnnoncesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  categorie: string;

  @CreateDateColumn({ type: 'date' })
  dateCreation: Date;

  @Column({ type: 'date' })
  date: Date;
  
  @Column({ type: 'varchar' }) //unique
  image: string;

  @ManyToOne( //plusieurs annonces peuvent être associées à un seul client
  type => UsersEntity,
  user => user.id)
  user: UsersEntity; //userId dans bdd

}