import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produtor } from "./entity/produtor.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProdutorRepository {
    constructor(
        @InjectRepository(Produtor)
        private readonly _produtorRepository: Repository<Produtor>
    ) { }

    async obterProdutor(): Promise<Produtor[]> {
        const produtor = await this._produtorRepository
            .createQueryBuilder('produtor')
            .select()
            .getRawMany<Produtor>();

        return produtor;
    }

    async obterProdutorId(idProdutor: number): Promise<Produtor> {
        const produtor = await this._produtorRepository
            .createQueryBuilder('produtor')
            .select()
            .where('produtor.id = :idProdutor', { idProdutor })
            .getOne()

        return produtor;
    }
}