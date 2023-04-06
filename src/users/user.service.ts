import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/entities/user.schema';
import { HTTP_MESSAGE, Response } from 'src/interfaces';
import { UserLoginDto, UserRegisterDto, UserUpdateDto } from './dto';
import { UserLogin, UserRegister } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import { ActiveDocument } from 'src/entities/active.schema';
import { compare, hashPassword } from 'src/utils';

@Injectable()
export class UserService {
    constructor(@InjectModel('users') private readonly userModel: Model<UserDocument>,
        @InjectModel('actives') private readonly activeModel: Model<ActiveDocument>) { }

    async getAllUser(): Promise<Response<User[]>> {
        try {
            const users = await this.userModel.find().lean()
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
                data: users
            }
        } catch (err) {
            throw new HttpException(HTTP_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserById(id: string): Promise<Response<User>> {
        try {
            const user = await this.userModel.findById(id).exec()
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
                data: user
            }
        } catch (err) {
            throw new HttpException(HTTP_MESSAGE.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    async register(userDto: UserRegisterDto): Promise<Response<UserRegister>> {
        const user = await this.userModel.findOne({ email: userDto.email });
        if (user) {
            throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
        }
        const activeToken = uuidv4()
        const newUser = await this.userModel.create({
            ...userDto,
            password: await hashPassword(userDto.password)
        })
        await this.activeModel.create({
            token: activeToken,
            userId: newUser.id
        })

        return {
            code: HttpStatus.OK,
            message: HTTP_MESSAGE.OK,
            data: {
                active: newUser.active,
                createdAt: newUser.createdAt,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        }
    }

    async login(userDto: UserLoginDto): Promise<Response<UserLogin>> {

        const user = await this.userModel.findOne({ email: userDto.email }).lean();

        if (user && await compare(userDto.password, user.password)) {
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
                data: {
                    active: user.active,
                    createdAt: user.createdAt,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName

                }
            }
        }

        throw new HttpException(HTTP_MESSAGE.LOGIN_FAILED, HttpStatus.BAD_REQUEST)
    }

    async activeUser(token: string): Promise<Response<null>> {
        const userToken = await this.activeModel.findOne({ token }).lean()
        if (userToken) {
            await this.userModel.findByIdAndUpdate(userToken.userId, { active: true }, { new: true }).lean()
            return {
                code: HttpStatus.OK,
                message: HTTP_MESSAGE.OK,
            }
        }
        else throw new HttpException('TOKEN NOT FOUND', HttpStatus.NOT_FOUND)

    }

    async updateUser(userUpdateDto: UserUpdateDto): Promise<Response<null>> {
        const { id, ...updateInfo } = userUpdateDto

        const user = await this.userModel.findByIdAndUpdate(id, { ...updateInfo }, { new: true }).lean()
        console.log(user)
        if (!user) throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND)
        return {
            code: HttpStatus.OK,
            message: HTTP_MESSAGE.OK,
        }

    }
}