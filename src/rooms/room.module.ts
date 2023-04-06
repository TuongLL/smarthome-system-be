import { Module } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomSchema } from "src/entities/room.schema";
import { UserSchema } from "src/entities/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'rooms',
                schema: RoomSchema
            },
            {
                name: 'users',
                schema: UserSchema
            }
        ])
    ],
    providers: [RoomService],
    controllers: [RoomController]
})
export class RoomModule { }