import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TwilioModule } from './twilio/twilio.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    TwilioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
