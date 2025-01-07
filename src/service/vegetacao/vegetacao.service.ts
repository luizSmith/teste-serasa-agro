import { Injectable, Logger } from "@nestjs/common";
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
import { SafraService } from "../safra/safra.service";

@Injectable()
export class VegetacaoService {
    readonly logger = new Logger(VegetacaoService.name)

    constructor(
        private _vegetacaoRepository: VegetacaoRepository,
        private _produtorService: ProdutorService,
        private _safraService: SafraService,
        private _fazendaService: FazendaService,
        private _culturaService: CulturaService,
    ) { }

    async obterVegetacaoProdutor(parametros: ObterVegetacaoRequest): Promise<ObterVegetacaoResponse[]> {
        await this._produtorService.obterProdutorId(parametros)

        return await this._vegetacaoRepository.obterVegetacaoProdutor(parametros.idProdutor);
    }

    async criarVegetacao(parametros: CriarVegetacaoRequest): Promise<CriarVegetacaoResponse> {
        await this._culturaService.obterCulturaId(parametros.idCultura);

        const safra = await this._safraService.obterSafraId(parametros.idSafra);

        const fazenda = await this._fazendaService.obterFazendaId(safra.idFazenda);

        const vegetacao = await this._vegetacaoRepository.obterVegetacaoFazenda(parametros.idSafra)

        this.validarAreaLivre({
            fazenda,
            vegetacao,
            quantidadeVegetacao: parametros.quantidadeVegetacao
        })

        const parametrosVegetacao: CriarVegetacaoDTO = {
            idCultura: parametros.idCultura,
            idSafra: parametros.idSafra,
            quantidadeVegetacao: parametros.quantidadeVegetacao
        }

        try {
            return await this._vegetacaoRepository.criarVegetacao(parametrosVegetacao)
        } catch (error) {
            this.logger.fatal(error)
            throw new RegraDeNegocioException(
                ["Erro ao finalizar vegetacao"], 400
            );
        }
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