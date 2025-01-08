import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Safra } from "./entity/safra.entity";
import { Repository } from "typeorm";
import { CriarSafraDTO } from "src/model/safra/dto/criarSafra.dto";
import { ObterSafraAnoDAO, ObterSafraIdDAO } from "src/model/safra/dao/obterSafra.dao";
import { Fazenda } from "../fazenda/entity/fazenda.entity";
import { SafraCultura } from "../vegetacao/entity/safraCultura.entity";
import { Cultura } from "../cultura/entity/cultura.entity";
import { ObterSafraAnoRequest } from "src/controller/safra/request/obterSafra.request";

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

    async obterFazendaIdFazenda(idFazenda: string): Promise<ObterSafraIdDAO> {
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

    async obterSafraAno(parametros: ObterSafraAnoRequest): Promise<ObterSafraAnoDAO[]> {
        return await this._safraRepository
            .createQueryBuilder('safra')
            .select('fazenda.id', 'idFazenda')
            .addSelect('fazenda.nome', 'nomeFazenda')
            .addSelect('cultura.nome', 'nomeCultura')
            .addSelect('EXTRACT(YEAR FROM safra.dt_inicio)', 'ano')
            .addSelect('SUM(safraCultura.qt_vegetacao)', 'QuantidadePlantada')
            .innerJoin(Fazenda, 'fazenda', 'fazenda.id = safra.id_fazenda')
            .innerJoin(SafraCultura, 'safraCultura', 'safraCultura.id_safra = safra.id')
            .innerJoin(Cultura, 'cultura', 'cultura.id = safraCultura.id_cultura')
            .where("fazenda.id = :idFazenda", { idFazenda: parametros.idFazenda })
            .andWhere("EXTRACT(YEAR FROM safra.dt_inicio) = :ano", { ano: parametros.ano })
            .groupBy('fazenda.id')
            .addGroupBy('ano')
            .addGroupBy('cultura.nome')
            .getRawMany<ObterSafraAnoDAO>();
    }

}