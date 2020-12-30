import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import 'dotenv/config';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Online-Store RestAPI')
    .setDescription('Online-Store RestAPI')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);

  // app.setGlobalPrefix('api');
  await app.listen(PORT);

  console.log(`OnlineStore is running on: ${await app.getUrl()}`);
}
bootstrap();
