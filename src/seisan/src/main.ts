import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  });

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
