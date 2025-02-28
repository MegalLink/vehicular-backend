import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const APP_PORT=+process.env.PORT!
  const ALLOWED_DOMAINS_VALUE = process.env.ALLOWED_DOMAINS!

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  
  if (ALLOWED_DOMAINS_VALUE === 'all') {
    app.enableCors();
  } else {
    const allowedOrigins = ALLOWED_DOMAINS_VALUE.split(',').map(domain => domain.trim());
    app.enableCors({
      origin: allowedOrigins,
      credentials: true,
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(
    '/api/v1/order/stripe-payment-webhook',
    bodyParser.raw({ type: 'application/json' }),
  );

  const config = new DocumentBuilder()
    .setTitle('Vehicular Backend')
    .setDescription('Vehicular Backend endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document, {
    swaggerOptions: {
      supportedSubmitMethods: [],
    },
  });

  await app.listen(APP_PORT);
}

bootstrap();
