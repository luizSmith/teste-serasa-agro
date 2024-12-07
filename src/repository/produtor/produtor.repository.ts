import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produtor } from "./entity/produtor.entity";
import { Repository } from "typeorm";
import { CriarProdutorDTO } from "src/model/produtor/dto/criarProdutor.dto";
import { AtualizarProdutorDTO } from "src/model/produtor/dto/atualizarProdutor.dto";

@Injectable()
export class ProdutorRepository {
    constructor(
        @InjectRepository(Produtor)
        private readonly _produtorRepository: Repository<Produtor>
    ) { }

    async obterProdutor(): Promise<Produtor[]> {
        const produtor = await this._produtorRepository
            .createQueryBuilder('produtor')
            .select('produtor.id', 'id')
            .addSelect('produtor.nome', 'nome')
            .addSelect('produtor.cnpj', 'cnpj')
            .addSelect('produtor.cpf', 'cpf')
            .addSelect('produtor.ativo', 'ativo')
            .addSelect('produtor.criado', 'criado')
            .where('produtor.ativo = true')
            .getRawMany<Produtor>();

        return produtor;
    }

    async obterProdutorId(idProdutor: string): Promise<Produtor> {
        const produtor = await this._produtorRepository
            .createQueryBuilder('produtor')
            .select()
            .where(`produtor.id = :idProdutor`, { idProdutor })
            .andWhere('produtor.ativo = true')
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

    async atualizarProdutor(idProdutor: string, parametros: AtualizarProdutorDTO): Promise<number> {
        const produtor = await this._produtorRepository.update(
            {
                id: idProdutor
            },
            {
                ...parametros
            }
        );

        return produtor.affected || 0;
    }
}