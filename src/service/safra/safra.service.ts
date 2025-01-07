import { Injectable } from "@nestjs/common";
import { FazendaService } from "../fazenda/fazenda.service";
import { SafraRepository } from "src/repository/safra/safra.repository";
import { CriarSafraRequest } from "src/controller/safra/request/criarSafra.request";
import { CriarSafraResponse } from "src/controller/safra/response/criarSafra.response";

@Injectable()
export class SafraService {
    constructor(
        private _safraRepository: SafraRepository,
        private _fazendaService: FazendaService,
    ) { }

    async criarSafra(parametros: CriarSafraRequest): Promise<CriarSafraResponse> {
        await this._fazendaService.obterFazendaId(parametros.idFazenda);

        const safra = await this._safraRepository.criarSafra({
            idFazenda: parametros.idFazenda,
            ativa: true
        })

        return safra;
    }
}