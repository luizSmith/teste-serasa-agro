import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidacaoCustomizadaPipe } from './infraestructure/pipe/validacaoCustomizada.pipe';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { CustomLogger } from './infraestructure/logger/custom.logger';
import { LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  initializeTransactionalContext()
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('API Agricultura')
    .setDescription('Api de controle de vegetação')
    .setVersion('v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidacaoCustomizadaPipe());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.useLogger(app.get(CustomLogger));

  const port = process.env.NODE_PORT || 3000;
  await app.listen(port);
  console.info('APP LISTENING ON PORT: ' + port);
}

bootstrap();
