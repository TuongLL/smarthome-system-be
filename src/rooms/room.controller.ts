import { Controller, Get, Body, Post, Param } from "@nestjs/common";
import { Room } from "src/entities/room.schema";
import { Response } from "src/interfaces";
import { RoomService } from "./room.service";
import { AddUserToRoomDto, CreateRoomDto } from "./dto";

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Get()
    async getAllRooms(): Promise<Response<Room[]>> {
        return await this.roomService.getAllRooms()
    }
    @Post()
    async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Response<null>> {
        return await this.roomService.createRoom(createRoomDto)
    }

    @Get(':roomId')
    async getRoomById(@Param('roomId') roomId: string): Promise<Response<Room>> {
        return await this.roomService.getRoomById(roomId);
    }

    @Post(':roomId/users')
    async addUserToRoom(@Param('roomId') roomId: string, @Body() addUserToRoom: AddUserToRoomDto): Promise<Response<null>> {
        return await this.roomService.addUserToRoom(roomId, addUserToRoom.userId);
    }

    @Post(':roomId/users/:userId')
    async checkUserInRoom(@Param('roomId') roomId: string, @Param('userId') userId: string): Promise<Response<boolean>> {
        return await this.roomService.checkUserInRoom(roomId, userId);
    }
}