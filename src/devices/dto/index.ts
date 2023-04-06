import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsArray, IsOptional} from 'class-validator'

export class CreateDeviceDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsString()
    type:string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsString()
    feed:string;
}

export class AddDeviceToRoomDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsString()
    deviceId: string;
}
export class DeviceByIds {
    @ApiProperty({
        type: [String],
        description: 'This is a required property',
    })
    @IsNotEmpty()
    @IsArray()
    deviceIds: string[]
}

export class UserDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    lastName: string;
    
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: Boolean,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    active: boolean;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    phoneNumber: string

    @ApiPropertyOptional({
        type: Date,
        description: 'This is a required property',
    })
    @IsOptional()
    createdAt?: Date
  
    @ApiPropertyOptional({
        type: Date,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    updatedAt?: Date
}