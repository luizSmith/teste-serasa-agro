import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidacaoCustomizadaPipe } from './infraestructure/pipe/validacaoCustomizada.pipe';
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';

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

  app.useGlobalPipes(new ValidacaoCustomizadaPipe());

  const port = process.env.NODE_PORT || 3000;
  await app.listen(port);
  console.info('APP LISTENING ON PORT: ' + port);
}


bootstrap();
