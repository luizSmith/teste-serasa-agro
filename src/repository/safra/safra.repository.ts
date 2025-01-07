import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Safra } from "./entity/safra.entity";
import { Repository } from "typeorm";
import { CriarSafraDTO } from "src/model/safra/dto/criarSafra.dto";
import { ObterSafraIdDAO } from "src/model/safra/dao/obterSafra.dao";
import { Fazenda } from "../fazenda/entity/fazenda.entity";

@Injectable()
export class SafraRepository {
    constructor(
        @InjectRepository(Safra)
        private readonly _safraRepository: Repository<Safra>
    ) { }

    async criarSafra(parametros: CriarSafraDTO): Promise<Safra> {
        return this._safraRepository.create(parametros).save();
    }

    async obterSafraId(idSafra: string): Promise<ObterSafraIdDAO> {
        return await this._safraRepository
            .createQueryBuilder('safra')
            .select('safra.id', 'id')
            .addSelect('safra.id_fazenda', 'idFazenda')
            .addSelect('safra.dt_inicio', 'dtInicio')
            .addSelect('safra.dt_fim', 'dtFim')
            .addSelect('safra.ativo', 'ativo')
            .where('safra.ativo = true')
            .andWhere("safra.id = :idSafra", { idSafra })
            .getRawOne<ObterSafraIdDAO>();
    }

    async obterFazendaIdSafra(idFazenda: string): Promise<ObterSafraIdDAO> {
        return await this._safraRepository
            .createQueryBuilder('safra')
            .select('safra.id', 'id')
            .addSelect('safra.id_fazenda', 'idFazenda')
            .addSelect('safra.dt_inicio', 'dtInicio')
            .addSelect('safra.dt_fim', 'dtFim')
            .addSelect('safra.ativo', 'ativo')
            .innerJoin(Fazenda, 'fazenda', 'fazenda.id = safra.id_fazenda')
            .where('safra.ativo = true')
            .andWhere("fazenda.id = :idFazenda", { idFazenda })
            .getRawOne<ObterSafraIdDAO>();
    }

    async finalizarSafra(idSafra: string): Promise<number> {
        const produtor = await this._safraRepository.update(
            {
                id: idSafra
            },
            {
                ativo: false,
                dtFim: new Date()
            }
        );

        return produtor.affected || 0;
    }

}