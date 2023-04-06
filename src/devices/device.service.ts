import { HttpStatus, Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Device, DeviceDocument } from 'src/entities/device.schema'
import { HTTP_MESSAGE, Response } from 'src/interfaces'
import { CreateDeviceDto } from './dto'
import { RoomDocument } from 'src/entities/room.schema'
import { indexOf } from 'lodash'
@Injectable()
export class DeviceService {
    constructor(@InjectModel('devices') private readonly deviceModel: Model<DeviceDocument>,
        @InjectModel('rooms') private readonly roomModel: Model<RoomDocument>) { }

    async getAllDevices(): Promise<Response<Device[]>> {
        try {
            const devices = await this.deviceModel.find().lean()
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
                data: devices
            }
        } catch (err) {
            throw new HttpException(HTTP_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createDevice(deviceInfo: CreateDeviceDto): Promise<Response<null>> {
        try {
            await this.deviceModel.create({
                ...deviceInfo
            })
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
            }
        } catch (err) {
            throw new HttpException(HTTP_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDeviceById(roomId: string): Promise<Response<Device>> {
        const device = await this.deviceModel.findById(roomId).lean()
        if (device) {
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
                data: device
            }
        }
        else throw new HttpException('Room Not Found', HttpStatus.NOT_FOUND)
    }

    async addDeviceToRoom(roomId: string, deviceId: string): Promise<Response<null>> {
        const deviceInRoom = await this.checkUserInRoom(roomId, deviceId)
        if (deviceInRoom.data == true) throw new HttpException('Device already exist in Room', HttpStatus.BAD_REQUEST)
        await this.roomModel.findByIdAndUpdate(roomId, {
            $push: {
                deviceIds: deviceId
            }
        }, { new: true }).lean()
        return {
            code: HttpStatus.OK,
            message: HTTP_MESSAGE.OK,
        }
    }

    async checkUserInRoom(roomId: string, deviceId: string): Promise<Response<boolean>> {
        const device = await this.deviceModel.findById(deviceId).lean()
        if (!device) throw new HttpException('Device Not Found', HttpStatus.NOT_FOUND)
        const room = await this.roomModel.findById(roomId).lean()
        if (!room) throw new HttpException('Room Not Found', HttpStatus.NOT_FOUND)
        return {
            code: HttpStatus.OK,
            message: HTTP_MESSAGE.OK,
            data: (indexOf(room.deviceIds, deviceId) == -1) ? false : true
        }
    }
}