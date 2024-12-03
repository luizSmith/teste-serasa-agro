import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('API Agricultura')
    .setDescription('Apenas uma Poc')
    .setVersion('v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.NODE_PORT || 3000;
  await app.listen(port);
  console.info('APP LISTENING ON PORT: ' + port);
}
bootstrap();
