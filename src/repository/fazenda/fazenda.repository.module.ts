import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FazendaRepository } from './fazenda.repository';
import { Fazenda } from './entity/fazenda.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Fazenda])],
    providers: [FazendaRepository],
    exports: [FazendaRepository],
})
export class FazendaRepositoryModule { }