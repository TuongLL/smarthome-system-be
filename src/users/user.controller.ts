import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Response } from '../interfaces';
import { UserService } from './user.service';
import { User } from 'src/entities/user.schema';
import { UserLogin, UserRegister } from './interfaces';
import { UserActiveDto, UserLoginDto, UserRegisterDto, UserUpdateDto } from './dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async getAllUsers(): Promise<Response<User[]>> {
        return await this.userService.getAllUser()
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<Response<User>> {
        return await this.userService.getUserById(id)
    }

    @Post('register')
    async register(@Body() userDto: UserRegisterDto): Promise<Response<UserRegister>> {
        return await this.userService.register(userDto)
    }

    @Post('login')
    async login(@Body() userDto: UserLoginDto): Promise<Response<UserLogin>> {
        return await this.userService.login(userDto)
    }

    @Post('active')
    async activeUser(@Body() activeUserDto: UserActiveDto): Promise<Response<null>> {
        return await this.userService.activeUser(activeUserDto.token)
    }

    @Post('update')
    async updateUser(@Body() updateUserDto: UserUpdateDto): Promise<Response<null>> {
        console.log(updateUserDto)
        return await this.userService.updateUser(updateUserDto)
    }

}
