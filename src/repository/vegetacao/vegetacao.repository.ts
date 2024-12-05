import { InjectRepository } from "@nestjs/typeorm";
import { FazendaCultura } from "./entity/fazendaCultura.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Fazenda } from "../fazenda/entity/fazenda.entity";
import { Cultura } from "./entity/cultura.entity";
import { ObterVegetacaoDAO } from "src/model/vegetacao/dao/ObterVegetacao.dao";

@Injectable()
export class VegetacaoRepository {
    constructor(
        @InjectRepository(FazendaCultura)
        private readonly _vegetacaoRepository: Repository<FazendaCultura>
    ) { }

    async obterVegetacao(idProdutor: string): Promise<ObterVegetacaoDAO[]> {
        return await this._vegetacaoRepository.createQueryBuilder('fazendaCultura')
            .select('fazenda.id', 'id')
            .addSelect('fazenda.nome, nome')
            .addSelect('SUM(fc.qt_vegetacao)', 'quantidadeVegetacao')
            .innerJoinAndSelect(Fazenda, 'fazenda', 'fazenda.id = fazendaCultura.id_fazenda')
            .innerJoinAndSelect(Cultura, 'cultura', 'cultura.id = fazendaCultura.id_cultura')
            .where('fazenda.id_produtor = :idProdutor', { idProdutor })
            .groupBy('fazenda.id')
            .addGroupBy('fazenda.nome')
            .getRawMany<ObterVegetacaoDAO>()
    }
}