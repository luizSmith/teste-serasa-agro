import { Injectable } from "@nestjs/common";
import { ObterVegetacaoRequest } from "src/controller/vegetacao/request/obterVegetacao.request";
import { VegetacaoRepository } from "src/repository/vegetacao/vegetacao.repository";
import { ProdutorService } from "../produtor/produtor.service";
import { ObterVegetacaoResponse } from "src/controller/vegetacao/response/obterVegetacao.response";
import { CriarVegetacaoRequest } from "src/controller/vegetacao/request/criarVegetacao.request";
import { FazendaService } from "../fazenda/fazenda.service";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { CriarVegetacaoDTO } from "src/model/vegetacao/dto/criarVegetacao.dto";
import { CulturaService } from "../cultura/cultura.service";
import { ValidarCriaVegetacaoDTO } from "src/model/vegetacao/dto/validarCriaVegetacao.dto";
import { CriarVegetacaoResponse } from "src/controller/vegetacao/response/criarVegetacao.response";

@Injectable()
export class VegetacaoService {
    constructor(
        private _vegetacaoRepository: VegetacaoRepository,
        private _produtorService: ProdutorService,
        private _fazendaService: FazendaService,
        private _culturaService: CulturaService,
    ) { }

    async obterVegetacaoProdutor(parametros: ObterVegetacaoRequest): Promise<ObterVegetacaoResponse[]> {
        await this._produtorService.obterProdutorId(parametros)

        return await this._vegetacaoRepository.obterVegetacaoProdutor(parametros.idProdutor);
    }

    async criarVegetacao(parametros: CriarVegetacaoRequest): Promise<CriarVegetacaoResponse> {
        await this._culturaService.obterCulturaId(parametros.idCultura);

        const fazenda = await this._fazendaService.obterFazendaId(parametros.idFazenda);

        const vegetacao = await this._vegetacaoRepository.obterVegetacaoFazenda(parametros.idFazenda)

        this.validarAreaLivre({
            fazenda,
            vegetacao,
            quantidadeVegetacao: parametros.quantidadeVegetacao
        })

        const parametrosVegetacao: CriarVegetacaoDTO = {
            idCultura: parametros.idCultura,
            idFazenda: parametros.idFazenda,
            quantidadeVegetacao: parametros.quantidadeVegetacao
        }

        return await this._vegetacaoRepository.criarVegetacao(parametrosVegetacao)
    }

    private validarAreaLivre(parametros: ValidarCriaVegetacaoDTO): void {
        const vegetacaoExiste = parametros.vegetacao && parametros.vegetacao.quantidadeVegetacao;

        if (vegetacaoExiste) {
            const areaLivre = parametros.fazenda.quantidadeTotalHectares - parametros.vegetacao.quantidadeVegetacao;

            if (areaLivre < parametros.quantidadeVegetacao) {
                throw new RegraDeNegocioException(['Arega de vegetação não pode ultrapassar o tamanho total da fazenda'], 400);
            }
        } else if (parametros.fazenda.quantidadeTotalHectares < parametros.quantidadeVegetacao) {
            throw new RegraDeNegocioException(['Arega de vegetação não pode ultrapassar o tamanho total da fazenda'], 400);
        }
    }
}