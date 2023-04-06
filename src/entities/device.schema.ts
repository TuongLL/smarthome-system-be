import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DeviceDocument = Device & Document
@Schema({ timestamps: true })
export class Device {
    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    roomId: string;

    @Prop()
    feed: string;

    @Prop()
    record: [
        {
            state: boolean;
            timestamps: Date
        }
    ]


}

export const DeviceSchema = SchemaFactory.createForClass(Device)