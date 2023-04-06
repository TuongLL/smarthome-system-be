import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceModule } from './devices/device.module';
import { RoomModule } from './rooms/room.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URI'), // Loaded from .ENV
    })
  }), ConfigModule.forRoot({ isGlobal: true, }),
    UserModule, RoomModule, DeviceModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
