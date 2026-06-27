import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('AjudAqui API')
    .setDescription('')
    .setVersion('2.0')
    .addTag('MAP')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix('api');
  SwaggerModule.setup('api/swagger', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
