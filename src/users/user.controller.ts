import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiResponse, ApiTags, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { UserDto } from 'src/devices/dto';
import { User } from 'src/entities/user.schema';
import { Response } from '../interfaces';
import { UserActiveDto, UserByIds, UserUpdateDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
// @UseGuards(JwtAuthGuard)
@ApiTags('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Returns a list of users',
        type: [UserDto],
    })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getAllUsers(): Promise<Response<UserDto[]>> {
        return await this.userService.getAllUser()
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({
        status: 200,
        description: 'Returns an user',
        type: UserDto,
    })
    @ApiNotFoundResponse({
        description: 'User Not Found'
    })
    async getUserById(@Param('id') id: string): Promise<Response<UserDto>> {
        return await this.userService.getUserById(id)
    }

    @Post()
    @ApiOperation({ summary: 'Get list of users by userIds' })
    @ApiResponse({
        status: 200,
        description: 'Returns a list of users',
        type: [UserDto],
    })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getUserByIds(@Body() userByIds: UserByIds): Promise<Response<User[]>> {
        return await this.userService.getUserByIds(userByIds.userIds)
    }

    @Post('active')
    @ApiOperation({ summary: 'Active user account' })
    @ApiOkResponse({
        description: 'Successfully active user',
    })
    @ApiNotFoundResponse({
        description: 'Token Not Found'
    })
    async activeUser(@Body() activeUserDto: UserActiveDto): Promise<Response<null>> {
        return await this.userService.activeUser(activeUserDto.token)
    }

    @Post('update')
    @ApiOperation({ summary: 'Update user account' })
    @ApiOkResponse({
        description: 'Successfully update user',
    })
    @ApiNotFoundResponse({
        description: 'User Not Found'
    })
    async updateUser(@Body() updateUserDto: UserUpdateDto): Promise<Response<UserDto>> {
        return await this.userService.updateUser(updateUserDto)
    }

}

