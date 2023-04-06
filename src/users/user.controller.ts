import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.-auth.guard';
import { User } from 'src/entities/user.schema';
import { Response } from '../interfaces';
import { UserActiveDto, UserByIds, UserUpdateDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('users')
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

    @Post()
    async getUserByIds(@Body() userByIds: UserByIds): Promise<Response<User[]>> {
        return await this.userService.getUserByIds(userByIds.userIds)
    }

    @Post('active')
    async activeUser(@Body() activeUserDto: UserActiveDto): Promise<Response<null>> {
        return await this.userService.activeUser(activeUserDto.token)
    }

    @Post('update')
    async updateUser(@Body() updateUserDto: UserUpdateDto): Promise<Response<null>> {
        return await this.userService.updateUser(updateUserDto)
    }

}

