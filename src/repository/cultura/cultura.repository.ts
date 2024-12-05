import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cultura } from "./entity/cultura.entity";
import { Repository } from "typeorm";

@Injectable()
export class CulturaRepository {
    constructor(
        @InjectRepository(Cultura)
        private readonly _culturaRepository: Repository<Cultura>
    ) { }

    async obterCulturaId(idCultura: string): Promise<Cultura> {
        return await this._culturaRepository.createQueryBuilder('cultura')
            .select()
            .where('cultura.id = :idCultura', { idCultura })
            .getOne()
    }
}