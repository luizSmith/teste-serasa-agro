import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fazenda } from "./entity/fazenda.entity";
import { Repository } from "typeorm";

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
}