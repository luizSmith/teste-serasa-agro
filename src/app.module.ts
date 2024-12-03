import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivrosControllerModule } from './controller/produtor.controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'process-local.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.PORT_DB) || 5432,
      host: process.env.HOST_DB,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
      logging: process.env.LOGGING == 'true',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    LivrosControllerModule,
  ],
})
export class AppModule { }
