import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TwilioService } from './twilio/twilio.service';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly twilioService: TwilioService) { }

  @Get('health-check')
  healthCheck(): string {
    return 'API is working!';
  }

  @Get('all-logs')
  async allLogs() {
    return await this.twilioService.getAllLogs();
  }
}
