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
          ssl: { rejectUnauthorized: false }
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
    CulturaControllerModule,
    VegetacaoControllerModule,
    PainelControllerModule,
  ],
})
export class AppModule {
  constructor() {
    console.log("variaveis acesso", {
      type: 'postgres',
      port: Number(process.env.PORT_DB) || 5432,
      host: process.env.HOST_DB,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
      logging: process.env.LOGGING == 'true',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: { rejectUnauthorized: false }
    })
  }
}
