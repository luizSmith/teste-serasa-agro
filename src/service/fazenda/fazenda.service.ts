import { Injectable } from "@nestjs/common";
import { FazendaRepository } from "src/repository/fazenda/fazenda.repository";
import { ProdutorService } from "../produtor/produtor.service";
import { ObterFazendasRequest } from "src/controller/fazenda/request/obterFazendas.request";
import { FazendaResponse } from "src/controller/fazenda/response/obterFazendas.response";

@Injectable()
export class FazendaService {
    constructor(private _fazendaRepository: FazendaRepository,
        private _produtorService: ProdutorService
    ) { }

    async obterFazendas(parametros: ObterFazendasRequest): Promise<FazendaResponse[]> {
        await this._produtorService.obterProdutorId(parametros)

        const fazendas = await this._fazendaRepository.obterFazendas(parametros.idProdutor)

        return fazendas;
    }
}