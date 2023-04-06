import {IsNotEmpty, IsString} from 'class-validator'

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    type:string;

    @IsNotEmpty()
    @IsString()
    feed:string;
}

export class AddDeviceToRoomDto {
    @IsNotEmpty()
    @IsString()
    deviceId: string;
}