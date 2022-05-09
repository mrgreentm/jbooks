import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:4200' },
  });
  app.useGlobalPipes(new ValidationPipe());
  const cors = {
    origin: [
      'http://localhost:4200',
      'http://localhost:5030',
      'http://localhost',
      '*',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  };
  app.enableCors(cors);
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  await app.listen(3333);
}
bootstrap();
