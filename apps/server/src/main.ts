import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { GlobalExceptionMiddleware } from './common/middlewares/globalException.middleware';
import mongoose from 'mongoose';
import { HttpExceptionFilter } from './common/filters/custom-http-exception.filter';
import * as swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from 'swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalFilters(new GlobalExceptionMiddleware());
  app.setGlobalPrefix('api');

  mongoose.set('debug', true);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.API_PORT || 4000);
}
bootstrap();
