import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fazenda } from "../fazenda/entity/fazenda.entity";
import { Repository } from "typeorm";
import { FazendaCultura } from "../vegetacao/entity/safraCultura.entity";
import { Cultura } from "../cultura/entity/cultura.entity";
import { Cidade } from "../cidade/entity/cidade.entity";
import { ObterPainelProdutorDAO } from "src/model/painel/dao/obterPainelProdutor.dao";

@Injectable()
export class PainelRepository {
    constructor(
        @InjectRepository(Fazenda)
        private readonly _PainelRepository: Repository<Fazenda>
    ) { }

    async obterPainelProdutor(): Promise<ObterPainelProdutorDAO[]> {
        return await this._PainelRepository.createQueryBuilder('fazenda')
            .select('fazenda.id', 'idFazenda')
            .addSelect('fazenda.nome', 'nomeFazenda')
            .addSelect('fazendaCultura.qt_vegetacao', 'quantidadeVegetacao')
            .addSelect('cultura.id', 'idCultura')
            .addSelect('cultura.nome', 'nomeCultura')
            .addSelect('fazenda.qt_total_hectares', 'quantidadeTotalFazenda')
            .addSelect('cidade.id', 'idCidade')
            .addSelect('cidade.nome', 'nomeCidade')
            .addSelect('cidade.uf', 'ufCidade')
            .innerJoin(Cidade, 'cidade', 'fazenda.id_cidade = cidade.id')
            .leftJoin(FazendaCultura, 'fazendaCultura', 'fazendaCultura.id_fazenda = fazenda.id')
            .leftJoin(Cultura, 'cultura', 'fazendaCultura.id_cultura = cultura.id')
            .getRawMany<ObterPainelProdutorDAO>();
    }
}