import { InjectRepository } from "@nestjs/typeorm";
import { SafraCultura } from "./entity/safraCultura.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Fazenda } from "../fazenda/entity/fazenda.entity";
import { Cultura } from "../cultura/entity/cultura.entity";
import { ObterVegetacaoDAO } from "src/model/vegetacao/dao/ObterVegetacao.dao";
import { CriarVegetacaoDTO } from "src/model/vegetacao/dto/criarVegetacao.dto";
import { Safra } from "../safra/entity/safra.entity";
import { Produtor } from "../produtor/entity/produtor.entity";

@Injectable()
export class VegetacaoRepository {
    constructor(
        @InjectRepository(SafraCultura)
        private readonly _vegetacaoRepository: Repository<SafraCultura>
    ) { }

    async obterVegetacaoProdutor(idProdutor: string): Promise<ObterVegetacaoDAO[]> {
        return await this._vegetacaoRepository.createQueryBuilder('safraCultura')
            .select('fazenda.id', 'id')
            .addSelect('fazenda.nome', 'nome')
            .addSelect('SUM(safraCultura.qt_vegetacao)', 'quantidadeVegetacao')
            .innerJoin(Safra, 'safra', 'safra.id = safraCultura.id_safra')
            .innerJoin(Cultura, 'cultura', 'cultura.id = safraCultura.id_cultura')
            .innerJoin(Fazenda, 'fazenda', 'fazenda.id = safra.id_fazenda')
            .where('safra.ativo = true')
            .andWhere('fazenda.id_produtor = :idProdutor', { idProdutor })
            .groupBy('fazenda.id')
            .addGroupBy('fazenda.nome')
            .getRawMany<ObterVegetacaoDAO>()
    }

    async criarVegetacao(parametros: CriarVegetacaoDTO): Promise<SafraCultura> {
        return this._vegetacaoRepository.create(parametros).save();
    }

    async obterVegetacaoFazenda(idSafra: string): Promise<ObterVegetacaoDAO> {
        return await this._vegetacaoRepository.createQueryBuilder('safraCultura')
            .select('fazenda.id', 'id')
            .addSelect('fazenda.nome', 'nome')
            .addSelect('SUM(safraCultura.qt_vegetacao)', 'quantidadeVegetacao')
            .innerJoin(Safra, 'safra', 'safra.id = safraCultura.id_safra')
            .innerJoin(Cultura, 'cultura', 'cultura.id = safraCultura.id_cultura')
            .innerJoin(Fazenda, 'fazenda', 'fazenda.id = safra.id_fazenda')
            .innerJoin(Produtor, 'produtor', 'produtor.id = fazenda.id_produtor')
            .where('safra.ativo = true')
            .andWhere('produtor.ativo = true')
            .andWhere('safra.id = :idSafra', { idSafra })
            .groupBy('fazenda.id')
            .addGroupBy('fazenda.nome')
            .getRawOne<ObterVegetacaoDAO>()
    }
}