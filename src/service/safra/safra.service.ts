import { Injectable } from "@nestjs/common";
import { FazendaService } from "../fazenda/fazenda.service";
import { SafraRepository } from "src/repository/safra/safra.repository";
import { CriarSafraRequest } from "src/controller/safra/request/criarSafra.request";
import { CriarSafraResponse } from "src/controller/safra/response/criarSafra.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { ObterSafraAnoResponse, ObterSafraResponse } from "src/controller/safra/response/obterSafra.response";
import { FinalizarSafraRequest } from "src/controller/safra/request/desativarSafra.request";
import { ObterSafraAnoRequest } from "src/controller/safra/request/obterSafra.request";

@Injectable()
export class SafraService {
    constructor(
        private _safraRepository: SafraRepository,
        private _fazendaService: FazendaService,
    ) { }

    async criarSafra(parametros: CriarSafraRequest): Promise<CriarSafraResponse> {
        await this._fazendaService.obterFazendaId(parametros.idFazenda);

        await this._validarFazenda(parametros.idFazenda);

        const safra = await this._safraRepository.criarSafra({
            idFazenda: parametros.idFazenda,
            ativo: true
        })

        return safra;
    }

    async obterSafraId(idFazenda: string): Promise<ObterSafraResponse> {
        const safra = await this._safraRepository.obterSafraId(idFazenda)

        if (!safra) {
            throw new RegraDeNegocioException(['idSafra não é valido'], 400);
        }

        return safra;
    }

    private async _validarFazenda(idFazenda: string): Promise<void> {
        const fazenda = this._safraRepository.obterFazendaIdSafra(idFazenda);

        if (fazenda) {
            throw new RegraDeNegocioException(['Fazenda já possui uma safra ativa'], 400);
        }
    }

    async finalizarSafra(parametros: FinalizarSafraRequest): Promise<void> {
        await this.obterSafraId(parametros.idSafra)

        await this._safraRepository.finalizarSafra(parametros.idSafra);
    }

    async obterSafraAno(parametros: ObterSafraAnoRequest): Promise<ObterSafraAnoResponse[]> {
        const safra = await this._safraRepository.obterSafraAno(parametros)

        if (safra.length == 0) {
            throw new RegraDeNegocioException(['Safra não encontrada'], 404);
        }

        return safra;
    }
}