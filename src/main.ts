import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder().setTitle('Call Forwarding Apis').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });
  const port = 3000;

  await app.listen(port);
  Logger.log(`🚀 Swagger is running on: http://localhost:${port}/api-docs`);
}
bootstrap();
