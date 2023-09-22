import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/users.dtos';
import { UpdateUserDto } from 'src/dto/updateUser.dtos';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
    ) 
    {}

    async getUsers(): Promise<UsersEntity[]> {
        return await this.usersRepository.find({})
    }
    
    async addUser(newUser: CreateUserDto): Promise<UsersEntity> {
        return await this.usersRepository.save(newUser)
    }

    async updateUser(id: number, User: UpdateUserDto): Promise<UsersEntity> {
        const newUser = await this.usersRepository.preload({
            id, //sélectionne l'id du user à maj
            ...User //récup les anciennes valeurs du user à maj
        })
        if(! newUser) {
            throw new NotFoundException(`cet id ${id} user n'existe pas`)
        }
        return await this.usersRepository.save(newUser)
    }

    //méthode utilisée x fois par la suite pour récup id user + gestion d'erreur
    async findUserById(id: number) {
        const user = await this.usersRepository.findOneBy({
            id: id // where id is your column name
        })
        if(! user) {
            throw new NotFoundException(`cet id ${id} user n'existe pas`)
        }
        return user
    }

    async deleteUser(id: number) {
        const userToDelete = await this.findUserById(id)
        return this.usersRepository.delete(userToDelete)
    }

    async softDeleteUser(id: number) {
        await this.findUserById(id) //pour gestion erreur mais pas besoin de récup const avec methode softDelete      
        return this.usersRepository.softDelete(id) //cette méthode requiert une col @DeleteDateColumn() dans l'entité en question
    }

    async restoreUser(id: number) {
        return this.usersRepository.restore(id) //cette méthode requiert une col @DeleteDateColumn() dans l'entité en question
    }



}
