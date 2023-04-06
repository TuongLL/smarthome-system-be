import { Module } from '@nestjs/common'
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { DeviceSchema } from 'src/entities/device.schema';
import { RoomSchema } from 'src/entities/room.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'devices',
                schema: DeviceSchema
            },
            {
                name: 'rooms',
                schema: RoomSchema
            }
        ])
    ],
    providers: [DeviceService],
    controllers: [DeviceController]
})
export class DeviceModule { }