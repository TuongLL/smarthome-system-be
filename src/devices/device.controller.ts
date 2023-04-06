import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { DeviceService } from './device.service';
import { Response } from 'src/interfaces';
import { Device } from 'src/entities/device.schema';
import { AddDeviceToRoomDto, CreateDeviceDto, DeviceByIds } from './dto';
import { Room } from 'src/entities/room.schema';
import { JwtAuthGuard } from 'src/auth/jwt.-auth.guard';
import { ApiTags } from '@nestjs/swagger';


@Controller('devices')
@ApiTags('devices')
@UseGuards(JwtAuthGuard)

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
    async getDeviceByIds(@Body() deviceByIds: DeviceByIds): Promise<Response<Device[]>> {
        return await this.deviceService.getDeviceByIds(deviceByIds.deviceIds)
    }

    @Post('create')
    async createDevice(@Body() createDeviceDto: CreateDeviceDto): Promise<Response<Device>> {
        return await this.deviceService.createDevice(createDeviceDto)
    }

    @Post(':roomId/devices')
    async addDeviceToRoom(@Param('roomId') roomId: string, @Body() addDeviceToRoom: AddDeviceToRoomDto): Promise<Response<Room>> {
        return await this.deviceService.addDeviceToRoom(roomId, addDeviceToRoom.deviceId);
    }

    @Post(':roomId/devices/:deviceId')
    async checkDeviceInRoom(@Param('roomId') roomId: string, @Param('deviceId') deviceId: string): Promise<Response<boolean>> {
        return await this.deviceService.checkDeviceInRoom(roomId, deviceId);
    }

}   