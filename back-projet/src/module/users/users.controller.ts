import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from 'src/dto/users.dtos';
import { UpdateUserDto } from 'src/dto/updateUser.dtos';


@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Get()
    async getAllUsers(): Promise<UsersEntity[]> {
        return await this.usersService.getUsers();
    }

    @Post('create')
    async postUser(
        @Body() newUser: CreateUserDto
    ): Promise<UsersEntity> {
        return await this.usersService.addUser(newUser);
    }

    @Patch(':id')
    async updateUser(
        @Body() newUser: UpdateUserDto,
        @Param('id', ParseIntPipe) id: number //ParseIntPipe : force l'id en int
    ): Promise<UsersEntity> {
        return await this.usersService.updateUser(id, newUser);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.usersService.deleteUser(id)
    }






    // @Delete(':id')
    // async softDeleteUser(
    //     @Param ('id', ParseIntPipe) id: number
    // ) {
    //     await this.usersService.softDeleteUser(id)
    // }

    // @Get('restore/:id')
    // async restoreUser(
    //     @Param ('id', ParseIntPipe) id: number) {
    //     return await this.usersService.restoreUser(id)
    // }

    
}