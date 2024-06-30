import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const corsOptions: CorsOptions = {
    origin: '*', // Replace with your allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Example API')
      .setDescription('The example API description')
      .setVersion('1.0')
      .addTag('example')
      .addBearerAuth( // This configures Swagger to use Bearer Auth
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token', // This is the name used internally by Swagger UI
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    app.enableCors(corsOptions);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(3000);
}
bootstrap();
