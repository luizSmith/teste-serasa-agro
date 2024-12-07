import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Fazenda } from "./entity/fazenda.entity";
import { CriarFazendaDTO } from "src/model/fazenda/dto/criarFazenda.dto";
import { ObterFazendasDAO } from "src/model/fazenda/dao/obterFazendas.dao";
import { ObterFazendaIdDAO } from "src/model/fazenda/dao/obterFazendaId.dao";


@Injectable()
export class FazendaRepository {
    constructor(
        @InjectRepository(Fazenda)
        private readonly _fazendaRepository: Repository<Fazenda>
    ) { }

    async obterFazendas(idProdutor: string): Promise<ObterFazendasDAO[]> {
        const fazenda = await this._fazendaRepository
            .createQueryBuilder('fazenda')
            .select('fazenda.id', 'id')
            .addSelect('fazenda.nome', 'nome')
            .addSelect('fazenda.qt_total_hectares', 'quantidadeTotalHectares')
            .addSelect('fazenda.logradouro', 'logradouro')
            .addSelect('fazenda.numero', 'numero')
            .addSelect('fazenda.referencia', 'referencia')
            .addSelect('fazenda.id_produtor', 'idProdutor')
            .addSelect('fazenda.id_cidade', 'idCidade')
            .where("fazenda.id_produtor = :idProdutor", { idProdutor })
            .getRawMany<ObterFazendasDAO>();

        return fazenda;
    }

    async criarFazenda(parametros: CriarFazendaDTO): Promise<Fazenda> {
        return await this._fazendaRepository.create(parametros).save()
    }

    async obterFazendaId(idFazenda: string): Promise<ObterFazendaIdDAO> {
        return await this._fazendaRepository
            .createQueryBuilder('fazenda')
            .select('fazenda.id', 'id')
            .addSelect('fazenda.nome', 'nome')
            .addSelect('fazenda.qt_total_hectares', 'quantidadeTotalHectares')
            .addSelect('fazenda.logradouro', 'logradouro')
            .addSelect('fazenda.numero', 'numero')
            .addSelect('fazenda.referencia', 'referencia')
            .addSelect('fazenda.id_produtor', 'idProdutor')
            .addSelect('fazenda.id_cidade', 'idCidade')
            .where("fazenda.id = :idFazenda", { idFazenda })
            .getRawOne<ObterFazendaIdDAO>();
    }
}