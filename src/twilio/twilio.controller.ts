import { Body, Controller, Post, Res } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { VoiceCallBackRequestDto, VoiceRequestDto } from './dto/voice.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Twilio')
@Controller('twilio')
export class TwilioController {
    constructor(private readonly twilioService: TwilioService) { }

    @Post('/ivr')
    async ivr(
        @Res() res: Response
    ) {
        const voice = this.twilioService.getInitialUserInput();
        res.type('text/xml').send(voice);
    }

    @Post('/voice')
    async voice(
        @Body() reqBody: VoiceRequestDto,
        @Res() res: Response
    ) {
        const voice = await this.twilioService.handleUserChoice(reqBody);
        res.type('text/xml').send(voice);
    }

    @Post('/handle-voicemail')
    async handleVoiceMail(
        @Body() reqBody: VoiceCallBackRequestDto,
        @Res() res: Response
    ) {
        const voice = await this.twilioService.handleVoicemailCallback(reqBody);
        res.type('text/xml').send(voice);
    }

    @Post('/handle-dial-status')
    async handleDail(
        @Body() reqBody: VoiceCallBackRequestDto,
        @Res() res: Response
    ) {
        const voice = this.twilioService.handleDailCallback(reqBody);
        res.type('text/xml').send(voice);
    }
}
