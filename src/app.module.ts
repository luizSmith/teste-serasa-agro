import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutorControllerModule } from './controller/produtor/produtor.controller.module';
import { FazendaControllerModule } from './controller/fazenda/fazenda.controller.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { VegetacaoControllerModule } from './controller/vegetacao/vegetacao.controller.module';
import { PainelControllerModule } from './controller/painel/painel.controlle.module';
import { CulturaControllerModule } from './controller/cultura/consulta.controller.module';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from './infraestructure/logger/custom.logger';
import { SafraControllerModule } from './controller/safra/safra.controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          port: Number(process.env.PORT_DB) || 5432,
          host: process.env.HOST_DB,
          username: process.env.USERNAME_DB,
          password: process.env.PASSWORD_DB,
          database: process.env.DATABASE,
          logging: process.env.LOGGING == 'true',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    ProdutorControllerModule,
    FazendaControllerModule,
    SafraControllerModule,
    CulturaControllerModule,
    VegetacaoControllerModule,
    PainelControllerModule,

    LoggerModule.forRoot({
      pinoHttp: {
        level: 'trace'
      }
    })
  ],
  providers: [CustomLogger],
  exports: [CustomLogger]
})
export class AppModule {
  constructor() {
    console.info("variaveis acesso", {
      type: 'postgres',
      port: Number(process.env.PORT_DB) || 5432,
      host: process.env.HOST_DB,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
      logging: process.env.LOGGING == 'true',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    })
  }
}
