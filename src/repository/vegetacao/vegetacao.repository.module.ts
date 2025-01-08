import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { SafraCultura } from "./entity/safraCultura.entity";
import { Cultura } from "../cultura/entity/cultura.entity";
import { VegetacaoRepository } from "./vegetacao.repository";
import { Fazenda } from "../fazenda/entity/fazenda.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SafraCultura, Cultura, Fazenda])],
    providers: [VegetacaoRepository],
    exports: [VegetacaoRepository],
})
export class VegetacaoRepositoryModule { }