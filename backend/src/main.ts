import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Gemini Backend')
    .setDescription('Gemini Example')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // O endpoint para acessar o Swagger será: http://localhost:3000/api
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
