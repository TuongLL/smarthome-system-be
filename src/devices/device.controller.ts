import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { DeviceService } from './device.service';
import { Response } from 'src/interfaces';
import { Device } from 'src/entities/device.schema';
import { AddDeviceToRoomDto, CreateDeviceDto } from './dto';
import { Room } from 'src/entities/room.schema';

@Controller()
export class DeviceController {
    constructor(private readonly deviceService: DeviceService){}

    @Get()
    async getAllDevices(): Promise<Response<Device[]>> {
        return await this.deviceService.getAllDevices()
    }
  
    @Get(':deviceId')
    async getRoomById(@Param('deviceId') deviceId: string): Promise<Response<Device>> {
        return await this.deviceService.getDeviceById(deviceId);
    }

    @Post()
    async createDevice(@Body() createDeviceDto: CreateDeviceDto): Promise<Response<Device>> {
        return await this.deviceService.createDevice(createDeviceDto)
    }

    @Post(':roomId/devices')
    async addUserToRoom(@Param('roomId') roomId: string, @Body() addDeviceToRoom: AddDeviceToRoomDto): Promise<Response<Room>> {
        return await this.deviceService.addDeviceToRoom(roomId, addDeviceToRoom.deviceId);
    }

    @Post(':roomId/devices/:deviceId')
    async checkUserInRoom(@Param('roomId') roomId: string, @Param('deviceId') deviceId: string): Promise<Response<boolean>> {
        return await this.deviceService.checkUserInRoom(roomId, deviceId);
    }

}   