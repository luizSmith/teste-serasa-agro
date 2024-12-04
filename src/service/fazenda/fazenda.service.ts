import { Injectable } from "@nestjs/common";
import { FazendaRepository } from "src/repository/fazenda/fazenda.repository";
import { ProdutorService } from "../produtor/produtor.service";
import { ObterFazendasRequest } from "src/controller/fazenda/request/obterFazendas.request";
import { CriarFazendaRequest } from "src/controller/fazenda/request/criarFazendas.request";
import { Fazenda } from "src/repository/fazenda/entity/fazenda.entity";
import { ViaCepClient } from "src/repository/client/viaCep/viaCep.client";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { CidadeService } from "../cidade/cidade.service";
import { CriarFazendaDTO } from "src/model/fazenda/criarFazenda.dto";

@Injectable()
export class FazendaService {
    constructor(
        private _fazendaRepository: FazendaRepository,
        private _viaCepClient: ViaCepClient,
        private _produtorService: ProdutorService,
        private _cidadeService: CidadeService,
    ) { }

    async obterFazendas(parametros: ObterFazendasRequest): Promise<Fazenda[]> {
        await this._produtorService.obterProdutorId(parametros)

        const fazendas = await this._fazendaRepository.obterFazendas(parametros.idProdutor)

        return fazendas;
    }

    async criarFazenda(parametros: CriarFazendaRequest): Promise<Fazenda> {
        await this._produtorService.obterProdutorId({
            idProdutor: parametros.idProdutor
        })

        const endereco = await this._viaCepClient.obterEnderecoPeloCep(parametros.cep)

        if (!endereco) {
            throw new RegraDeNegocioException(['Cep não é válido'], 400);
        }

        let cidade = await this._cidadeService.obterCidadeNomeUf({
            nome: endereco.localidade,
            uf: endereco.uf
        });

        if (!cidade) {
            cidade = await this._cidadeService.criarCidade({
                nome: endereco.localidade,
                uf: endereco.uf
            });
        }

        const parametrosFazenda: CriarFazendaDTO = {
            nome: parametros.nome,
            qtTotalHectares: parametros.qtTotalHectares,
            qtTotalAgricultavel: parametros.qtTotalAgricultavel,
            logradouro: endereco.logradouro,
            numero: parametros.numero,
            referencia: parametros.referencia,
            produtor: parametros.idProdutor,
            cidade: cidade.id
        }

        const fazenda = await this._fazendaRepository.criarFazenda(parametrosFazenda);

        return fazenda;
    }
}