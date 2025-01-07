import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cidade } from "./entity/cidade.entity";
import { Repository } from "typeorm";
import { CriarCidadeDTO } from "src/model/cidade/dto/criarCidade.dto";
import { ObterCidadeDTO } from "src/model/cidade/dto/obterCidade.dto";


@Injectable()
export class CidadeRepository {
    constructor(
        @InjectRepository(Cidade)
        private readonly _cidadeRepository: Repository<Cidade>
    ) { }

    async obterCidadeNomeUf(parametros: ObterCidadeDTO): Promise<Cidade | null> {
        return await this._cidadeRepository.createQueryBuilder('cidade')
            .select('cidade.id', 'id')
            .addSelect('cidade.nome', 'nome')
            .addSelect('cidade.uf', 'uf')
            .where('cidade.nome = :nome', { nome: parametros.nome })
            .andWhere('cidade.uf = :uf', { uf: parametros.uf })
            .getRawOne()
    }

    async criarCidade(parametros: CriarCidadeDTO): Promise<Cidade> {
        return await this._cidadeRepository.create({
            ...parametros
        }).save()
    }
}