import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { GlobalExceptionMiddleware } from './common/middlewares/globalException.middleware';
import mongoose from 'mongoose';
import { HttpExceptionFilter } from './common/filters/custom-http-exception.filter';
import * as swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // Serve Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Enable global validation pipe
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

  // Use global exception middleware
  app.useGlobalFilters(new GlobalExceptionMiddleware());
  
  // Set global prefix for API routes
  app.setGlobalPrefix('api');

  // Set mongoose debug mode
  mongoose.set('debug', true);

  // Use global HTTP exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Use global pipes (validation)
  app.useGlobalPipes(new ValidationPipe());

  // Start the application
  await app.listen(process.env.API_PORT || 4000);
}

bootstrap();
