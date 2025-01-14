import { Injectable, Logger } from "@nestjs/common";
import { FazendaRepository } from "src/repository/fazenda/fazenda.repository";
import { ProdutorService } from "../produtor/produtor.service";
import { ObterFazendasRequest } from "src/controller/fazenda/request/obterFazendas.request";
import { CriarFazendaRequest } from "src/controller/fazenda/request/criarFazendas.request";
import { ViaCepClient } from "src/repository/client/viaCep/viaCep.client";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { CidadeService } from "../cidade/cidade.service";
import { CriarFazendaDTO } from "src/model/fazenda/dto/criarFazenda.dto";
import { TratarCidadeDTO } from "src/model/fazenda/dto/tratarCidade.dto";
import { Cidade } from "src/repository/cidade/entity/cidade.entity";
import { ObterFazendaResponse } from "src/controller/fazenda/response/obterFazendas.response";
import { CriarFazendaResponse } from "src/controller/fazenda/response/criarFazendas.response";
import { Transactional } from "typeorm-transactional";
import { ObterEnderecoPeloCepDAO } from "src/model/client/viaCep/dao/obterEnderecoPeloCep.dao";

@Injectable()
export class FazendaService {
    readonly logger = new Logger(FazendaService.name)

    constructor(
        private _fazendaRepository: FazendaRepository,
        private _viaCepClient: ViaCepClient,
        private _produtorService: ProdutorService,
        private _cidadeService: CidadeService,
    ) { }

    async obterFazendas(parametros: ObterFazendasRequest): Promise<ObterFazendaResponse[]> {
        await this._produtorService.obterProdutorId(parametros)

        const fazendas = await this._fazendaRepository.obterFazendas(parametros.idProdutor)

        return fazendas;
    }

    @Transactional()
    async criarFazenda(parametros: CriarFazendaRequest): Promise<CriarFazendaResponse> {
        await this._produtorService.obterProdutorId({
            idProdutor: parametros.idProdutor
        })

        const endereco = await this.obterEnderecoFazenda(parametros.cep);

        const cidade = await this._tratarCidade({
            nome: endereco.localidade,
            uf: endereco.uf
        })

        const parametrosFazenda: CriarFazendaDTO = {
            nome: parametros.nome,
            qtTotalHectares: parametros.qtTotalHectares,
            logradouro: endereco.logradouro,
            numero: parametros.numero,
            referencia: parametros.referencia,
            idProdutor: parametros.idProdutor,
            idCidade: cidade.id
        }

        try {
            const fazenda = await this._fazendaRepository.criarFazenda(parametrosFazenda);
            return fazenda;

        } catch (error) {
            this.logger.fatal(error)
            throw new RegraDeNegocioException(
                ["Erro ao criar fazenda"], 400
            );
        }
    }

    private async _tratarCidade(parametros: TratarCidadeDTO): Promise<Cidade> {
        let cidade = await this._cidadeService.obterCidadeNomeUf({
            nome: parametros.nome,
            uf: parametros.uf
        });

        if (!cidade) {
            cidade = await this._cidadeService.criarCidade({
                nome: parametros.nome,
                uf: parametros.uf
            });
        }

        return cidade;
    }

    async obterFazendaId(idFazenda: string): Promise<ObterFazendaResponse> {
        const fazenda = await this._fazendaRepository.obterFazendaId(idFazenda)

        if (!fazenda) {
            throw new RegraDeNegocioException(['idFazenda não é valido'], 400);
        }

        return fazenda;
    }

    private async obterEnderecoFazenda(cep: string): Promise<ObterEnderecoPeloCepDAO> {
        const endereco = await this._viaCepClient.obterEnderecoPeloCep(cep)

        if (!endereco) {
            throw new RegraDeNegocioException(['Cep não é válido'], 400);
        }

        return endereco;
    }
}