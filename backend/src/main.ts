/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'http://localhost:4200',
    methods: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: 'Content-type, Authorization'
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
