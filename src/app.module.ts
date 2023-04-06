import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EntitiesModule } from './entities/entities.module';
import { UserModule } from './users/user.module';
import { RoomModule } from './rooms/room.module';
import { DeviceModule } from './devices/device.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://lamtuong2012392:Y4384f46tMA2YhUv@cluster0.qtuqtq9.mongodb.net/smarthomeAI?retryWrites=true&w=majority'), EntitiesModule,
    UserModule, RoomModule, DeviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
