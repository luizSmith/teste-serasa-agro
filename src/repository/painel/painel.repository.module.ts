import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PainelRepository } from './painel.repository';
import { Fazenda } from '../fazenda/entity/fazenda.entity';
import { FazendaCultura } from '../vegetacao/entity/fazendaCultura.entity';
import { Cultura } from '../cultura/entity/cultura.entity';
import { Cidade } from '../cidade/entity/cidade.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Fazenda,
        FazendaCultura,
        Cultura,
        Cidade
    ])],
    providers: [PainelRepository],
    exports: [PainelRepository],
})
export class PainelRepositoryModule { }