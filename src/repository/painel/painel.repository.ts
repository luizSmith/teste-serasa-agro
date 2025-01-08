import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fazenda } from "../fazenda/entity/fazenda.entity";
import { Repository } from "typeorm";
import { SafraCultura } from "../vegetacao/entity/safraCultura.entity";
import { Cultura } from "../cultura/entity/cultura.entity";
import { Cidade } from "../cidade/entity/cidade.entity";
import { ObterPainelProdutorDAO } from "src/model/painel/dao/obterPainelProdutor.dao";
import { Safra } from "../safra/entity/safra.entity";
import { Produtor } from "../produtor/entity/produtor.entity";

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
            .addSelect('safraCultura.qt_vegetacao', 'quantidadeVegetacao')
            .addSelect('cultura.id', 'idCultura')
            .addSelect('cultura.nome', 'nomeCultura')
            .addSelect('fazenda.qt_total_hectares', 'areaTotalFazenda')
            .addSelect('cidade.id', 'idCidade')
            .addSelect('cidade.nome', 'nomeCidade')
            .addSelect('cidade.uf', 'ufCidade')
            .innerJoin(Cidade, 'cidade', 'fazenda.id_cidade = cidade.id')
            .innerJoin(Safra, 'safra', 'safra.id_fazenda = fazenda.id')
            .innerJoin(Produtor, 'produtor', 'produtor.id = fazenda.id_produtor')
            .leftJoin(SafraCultura, 'safraCultura', 'safraCultura.id_safra = safra.id')
            .leftJoin(Cultura, 'cultura', 'safraCultura.id_cultura = cultura.id')
            .where('safra.ativo = true')
            .andWhere('produtor.ativo = true')
            .getRawMany<ObterPainelProdutorDAO>();
    }
}