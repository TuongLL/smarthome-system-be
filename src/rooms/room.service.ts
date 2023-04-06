import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Room, RoomDocument } from 'src/entities/room.schema'
import { HTTP_MESSAGE, Response } from 'src/interfaces'
import { AddUserToRoomDto, CreateRoomDto } from './dto'
import { UserDocument } from 'src/entities/user.schema'
import { indexOf } from 'lodash'
@Injectable()
export class RoomService {
    constructor(@InjectModel('rooms') private readonly roomModel: Model<RoomDocument>,
        @InjectModel('users') private readonly userModel: Model<UserDocument>) { }

    async getAllRooms(): Promise<Response<Room[]>> {
        try {
            const rooms = await this.roomModel.find().lean()
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
                data: rooms
            }
        } catch (err) {
            throw new HttpException(HTTP_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createRoom(roomInfo: CreateRoomDto): Promise<Response<Room>> {
        try {
            const room = await this.roomModel.create({
                ...roomInfo
            })
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
                data: room
            }
        } catch (err) {
            throw new HttpException(HTTP_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getRoomById(roomId: string): Promise<Response<Room>> {
        const room = await this.roomModel.findById(roomId).lean()
        if (room) {
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
                data: room
            }
        }
        else throw new HttpException('Room Not Found', HttpStatus.NOT_FOUND)
    }

    async addUserToRoom(roomId: string, userId: string): Promise<Response<Room>> {
        const userInRoom = await this.checkUserInRoom(roomId, userId)
        if (userInRoom.data == true) throw new HttpException('User already exist in Room', HttpStatus.BAD_REQUEST)
        const room = await this.roomModel.findByIdAndUpdate(roomId, {
            $push: {
                userIds: userId
            }
        }, { new: true }).lean()
        return {
            code: HttpStatus.OK,
            message: HTTP_MESSAGE.OK,
            data: room
        }

    }

    async checkUserInRoom(roomId: string, userId: string): Promise<Response<boolean>> {
        const user = await this.userModel.findById(userId).lean()
        if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        const room = await this.roomModel.findById(roomId).lean()
        if (!room) throw new HttpException('Room Not Found', HttpStatus.NOT_FOUND)
        return {
            code: HttpStatus.OK,
            message: HTTP_MESSAGE.OK,
            data: (indexOf(room.userIds, userId) == -1) ? false : true
        }
    }
}
