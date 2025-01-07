import { InjectRepository } from "@nestjs/typeorm";
import { SafraCultura } from "./entity/safraCultura.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Fazenda } from "../fazenda/entity/fazenda.entity";
import { Cultura } from "../cultura/entity/cultura.entity";
import { ObterVegetacaoDAO } from "src/model/vegetacao/dao/ObterVegetacao.dao";
import { CriarVegetacaoDTO } from "src/model/vegetacao/dto/criarVegetacao.dto";

@Injectable()
export class VegetacaoRepository {
    constructor(
        @InjectRepository(SafraCultura)
        private readonly _vegetacaoRepository: Repository<SafraCultura>
    ) { }

    async obterVegetacaoProdutor(idProdutor: string): Promise<ObterVegetacaoDAO[]> {
        return await this._vegetacaoRepository.createQueryBuilder('fazendaCultura')
            .select('fazenda.id', 'id')
            .addSelect('fazenda.nome', 'nome')
            .addSelect('SUM(fc.qt_vegetacao)', 'quantidadeVegetacao')
            .innerJoinAndSelect(Fazenda, 'fazenda', 'fazenda.id = fazendaCultura.id_fazenda')
            .innerJoinAndSelect(Cultura, 'cultura', 'cultura.id = fazendaCultura.id_cultura')
            .where('fazenda.id_produtor = :idProdutor', { idProdutor })
            .groupBy('fazenda.id')
            .addGroupBy('fazenda.nome')
            .getRawMany<ObterVegetacaoDAO>()
    }

    async criarVegetacao(parametros: CriarVegetacaoDTO): Promise<SafraCultura> {
        return this._vegetacaoRepository.create(parametros).save();
    }

    async obterVegetacaoFazenda(idFazenda: string): Promise<ObterVegetacaoDAO> {
        return await this._vegetacaoRepository.createQueryBuilder('fazendaCultura')
            .select('fazenda.id', 'id')
            .addSelect('fazenda.nome', 'nome')
            .addSelect('SUM("fazendaCultura".qt_vegetacao)', 'quantidadeVegetacao')
            .innerJoin(Fazenda, 'fazenda', 'fazenda.id = "fazendaCultura".id_fazenda')
            .innerJoin(Cultura, 'cultura', 'cultura.id = "fazendaCultura".id_cultura')
            .where('fazenda.id = :idFazenda', { idFazenda })
            .groupBy('fazenda.id')
            .addGroupBy('fazenda.nome')
            .getRawOne<ObterVegetacaoDAO>()
    }
}