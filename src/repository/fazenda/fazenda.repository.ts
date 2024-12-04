import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Fazenda } from "./entity/fazenda.entity";
import { CriarFazendaDTO } from "src/model/fazenda/dto/criarFazenda.dto";
import { CriarFazendaDAO } from "src/model/fazenda/dao/criarFazenda.dao";


@Injectable()
export class FazendaRepository {
    constructor(
        @InjectRepository(Fazenda)
        private readonly _fazendaRepository: Repository<Fazenda>
    ) { }

    async obterFazendas(idProdutor: string): Promise<CriarFazendaDAO[]> {
        const fazenda = await this._fazendaRepository
            .createQueryBuilder('fazenda')
            .select('fazenda.id', 'id')
            .addSelect('fazenda.nome', 'nome')
            .addSelect('fazenda.qt_total_hectares', 'totalHectares')
            .addSelect('fazenda.qt_total_agricultavel', 'totalAgricultavel')
            .addSelect('fazenda.logradouro', 'logradouro')
            .addSelect('fazenda.numero', 'numero')
            .addSelect('fazenda.referencia', 'referencia')
            .addSelect('fazenda.id_produtor', 'idProdutor')
            .addSelect('fazenda.id_cidade', 'idCidade')
            .where("fazenda.id_produtor = :idProdutor", { idProdutor })
            .getRawMany<CriarFazendaDAO>();

        return fazenda;
    }

    async criarFazenda(parametros: CriarFazendaDTO): Promise<Fazenda> {
        return await this._fazendaRepository.create(parametros).save()
    }
}