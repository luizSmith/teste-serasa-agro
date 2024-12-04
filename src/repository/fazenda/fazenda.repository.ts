import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Fazenda } from "./entity/fazenda.entity";
import { CriarFazendaDTO } from "src/model/fazenda/criarFazenda.dto";


@Injectable()
export class FazendaRepository {
    constructor(
        @InjectRepository(Fazenda)
        private readonly _fazendaRepository: Repository<Fazenda>
    ) { }

    async obterFazendas(idProdutor: string): Promise<Fazenda[]> {
        const fazenda = await this._fazendaRepository
            .createQueryBuilder('fazenda')
            .select()
            .where("fazenda.id_produtor = :idProdutor", { idProdutor })
            .getRawMany<Fazenda>();

        return fazenda;
    }

    async criarFazenda(parametros: CriarFazendaDTO): Promise<Fazenda> {
        return await this._fazendaRepository.create(parametros).save()
    }
}