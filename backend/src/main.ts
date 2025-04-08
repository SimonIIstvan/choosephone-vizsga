import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // Angular default port
    credentials: true,
  });
  app.use(
    session({
      secret: '38854713',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
