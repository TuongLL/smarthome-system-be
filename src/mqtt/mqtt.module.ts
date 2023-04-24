import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ADA_SERVICE',
                transport: Transport.MQTT,
                options: {
                    subscribeOptions: {
                        qos: 1
                    },
                    url: 'tcp://io.adafruit.com',
                    username: 'VyKing',
                    password: 'aio_TsTh03FEi4l5IUOXDpaDF17nh2o1'
                }
            },
            
        ])
    ],
    providers: [MqttService],
    controllers: [MqttController]
})
export class MqttModule { }
