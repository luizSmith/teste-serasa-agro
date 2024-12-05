import { Injectable } from "@nestjs/common";
import { ObterVegetacaoRequest } from "src/controller/vegetacao/request/obterVegetacao.request";
import { VegetacaoRepository } from "src/repository/vegetacao/vegetacao.repository";
import { ProdutorService } from "../produtor/produtor.service";
import { ObterVegetacaoResponse } from "src/controller/vegetacao/response/obterVegetacao.response";

@Injectable()
export class VegetacaoService {
    constructor(
        private _vegetacaoRepository: VegetacaoRepository,
        private _produtorService: ProdutorService,
    ) { }

    async obterVegetacao(parametros: ObterVegetacaoRequest): Promise<ObterVegetacaoResponse[]> {
        await this._produtorService.obterProdutorId(parametros)

        return await this._vegetacaoRepository.obterVegetacao(parametros.idProdutor);
    }
}