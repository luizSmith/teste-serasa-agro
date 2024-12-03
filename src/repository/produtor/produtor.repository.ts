import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produtor } from "./entity/produtor.entity";
import { Repository } from "typeorm";
import { CriarProdutorDTO } from "src/model/produtor/criarProdutor.dto";

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

    async obterProdutorId(idProdutor: string): Promise<Produtor> {
        const produtor = await this._produtorRepository
            .createQueryBuilder('produtor')
            .select()
            .where('produtor.id = :idProdutor', { idProdutor })
            .getOne()

        return produtor;
    }

    async criarProdutor(parametros: CriarProdutorDTO): Promise<Produtor> {
        return await this._produtorRepository.create({
            ...parametros,
            ativo: true
        }).save();
    }

    async deletarProdutorId(idProdutor: string): Promise<number> {
        const produtor = await this._produtorRepository.update(
            {
                id: idProdutor
            },
            {
                ativo: false,
            }
        );

        return produtor.affected || 0;
    }
}