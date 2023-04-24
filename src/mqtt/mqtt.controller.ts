import { Body, Controller, Get, Post } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { FanDto, LightDto } from './dto';
import { Ctx, EventPattern, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';

@Controller('mqtt')
export class MqttController {
    constructor(private readonly mqttService: MqttService) { }

    @Post("/light")
    sendLightState(@Body() light: LightDto) {
        return this.mqttService.sendLightState(light);
    }

    @Post("/fan")
    sendFanState(@Body() fan: FanDto) {
        console.log('fan')
        return this.mqttService.sendFanState(fan);
    }
}
