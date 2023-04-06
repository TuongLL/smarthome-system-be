import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { DeviceService } from './device.service';
import { Response } from 'src/interfaces';
import { Device } from 'src/entities/device.schema';

@Controller()
export class DeviceController {
    constructor(private readonly deviceService: DeviceService){}

    @Get()
    async getAllDevices(): Promise<Response<Device[]>> {
        return await this.deviceService.getAllDevices()
    }
}