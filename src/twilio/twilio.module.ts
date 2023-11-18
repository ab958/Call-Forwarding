import { Module } from '@nestjs/common';
import { TwilioController } from './twilio.controller';
import { TwilioService } from './twilio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserOperationLog, UserOperationLogSchema } from './schemas/user-log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserOperationLog.name, schema: UserOperationLogSchema }])],
  controllers: [TwilioController],
  providers: [TwilioService],
  exports: [TwilioService]
})
export class TwilioModule { }
