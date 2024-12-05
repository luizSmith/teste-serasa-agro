import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { FazendaCultura } from "./entity/fazendaCultura.entity";
import { Cultura } from "./entity/cultura.entity";
import { VegetacaoRepository } from "./vegetacao.repository";
import { Fazenda } from "../fazenda/entity/fazenda.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FazendaCultura, Cultura, Fazenda])],
    providers: [VegetacaoRepository],
    exports: [VegetacaoRepository],
})
export class VegetacaoRepositoryModule { }