import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TwilioModule } from './twilio/twilio.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://wahab:Ahhad123@cluster0.gnqnx.mongodb.net/'),
    // MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema },
    // { name: Log.name, schema: LogSchema }]),
    TwilioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
