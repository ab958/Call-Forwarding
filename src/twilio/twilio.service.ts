import { Injectable, Logger } from '@nestjs/common';
import { VoiceCallBackRequestDto, VoiceRequestDto } from './dto/voice.dto';
import { twiml } from 'twilio';
import { InjectModel } from '@nestjs/mongoose';
import { UserOperationLog } from './schemas/user-log.schema';
import { Model } from 'mongoose';
const { VoiceResponse } = twiml;


@Injectable()
export class TwilioService {
    private readonly logger = new Logger(TwilioService.name);
    constructor(
        @InjectModel(UserOperationLog.name) private readonly userLogRepository: Model<UserOperationLog>
    ) { }

    getInitialUserInput(): string {
        const response = new VoiceResponse();
        const gather = response.gather({
            numDigits: 1,
            action: '/twilio/voice',
            method: 'POST',
        });
        gather.say('Press 1 to speak with a representative or 2 to leave a voicemail.')
        return response.toString();
    }

    async handleUserChoice(reqBody: VoiceRequestDto): Promise<string> {
        const response = new VoiceResponse();
        const userChoice = reqBody.Digits;
        if (userChoice === '1') {
            response.dial({
                action: '/twilio/handle-dial-status',
                method: 'POST'
            }, '+923105428669');
        } else if (userChoice === '2') {
            response.say('Please leave a message after the beep. and Press the hash key when finished.');
            response.record({
                method: 'POST',
                action: '/twilio/handle-voicemail',
                maxLength: 30,
                finishOnKey: '#',
            });
        } else {
            await this.userLogRepository.create({
                errorMessage: 'Invalid choice'
            })
            this.logger.error(`Unexpected user choice: ${userChoice}`);
            response.say('Sorry, we did not understand your choice. Goodbye.');
        }
        return response.toString();
    }

    async handleVoicemailCallback(reqBody: VoiceCallBackRequestDto): Promise<string> {
        const response = new VoiceResponse();
        response.say('Thank you for leaving a message. Goodbye!');
        await this.userLogRepository.create({
            userChoice: 2,
            RecordingUrl: reqBody?.RecordingUrl,
            caller: reqBody?.Caller,
            callerCountry: reqBody?.CallerCountry,
            errorMessage: reqBody?.ErrorMessage,
        })
        return response.toString();
    }

    async handleDailCallback(reqBody: VoiceCallBackRequestDto): Promise<string> {
        const response = new VoiceResponse();
        response.say('Goodbye');
        await this.userLogRepository.create({
            userChoice: 2,
            RecordingUrl: reqBody?.RecordingUrl,
            caller: reqBody?.Caller,
            callerCountry: reqBody?.CallerCountry,
            errorMessage: reqBody?.ErrorMessage,
        })
        return response.toString();
    }

    async getAllLogs() {
        const logs = await this.userLogRepository.find();
        return {
            data: logs
        };
    }
}
