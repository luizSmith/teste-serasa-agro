import { Injectable } from "@nestjs/common";
import { ObterPainelProdutorResponse } from "src/controller/painel/response/obterPainelProdutor.response";
import { ObterPainelProdutorDAO } from "src/model/painel/dao/obterPainelProdutor.dao";
import { PainelRepository } from "src/repository/painel/painel.repository";

@Injectable()
export class PainelService {
    constructor(
        private _painelRepository: PainelRepository,
    ) { }

    async obterPainelProdutor(): Promise<ObterPainelProdutorResponse> {
        const dadosPainel = await this._painelRepository.obterPainelProdutor();

        return await this._tratarValores(dadosPainel);
    }

    private async _tratarValores(dadosPainel: ObterPainelProdutorDAO[]): Promise<ObterPainelProdutorResponse> {
        const toalFazendas: string[] = [];
        let totalHectares = 0;
        let totalVegetacao = 0;
        const estados: Record<string, number> = {};
        const culturas: Record<string, number> = {};

        for (const dado of dadosPainel) {
            if (toalFazendas.indexOf(dado.idFazenda) < 0) {
                toalFazendas.push(dado.idFazenda);
                totalHectares += Number(dado.quantidadeTotalFazenda);
                estados[dado.ufCidade] = (estados[dado.ufCidade] || 0) + 1;
            }
            totalVegetacao += Number(dado.quantidadeVegetacao);

            if (dado.nomeCultura) {
                culturas[dado.nomeCultura] = (culturas[dado.nomeCultura] || 0) + 1;
            }
        }

        const porcentagemDoSoloComVegetacao = Number(((totalVegetacao * 100) / totalHectares).toFixed(2));

        const porcentagensFazendasPorUf = await this._somaPorcentagemPorTipo(estados);
        const porcentagemPorTipoCultura = await this._somaPorcentagemPorTipo(culturas);

        const response: ObterPainelProdutorResponse = {
            quantidadeFazendas: toalFazendas.length,
            quantidadeHectares: totalHectares,
            porcentagemDoSoloComVegetacao: porcentagemDoSoloComVegetacao,
            porcentagensFazendasPorUf: porcentagensFazendasPorUf,
            porcentagemPorTipoCultura: porcentagemPorTipoCultura,
        }

        return response;
    }

    private async _somaPorcentagemPorTipo(parametros: Record<string, number>): Promise<Record<string, number>> {
        const somaTotalRegistros = Object.values(parametros).reduce((soma, valor) => soma + valor, 0);

        const porcentagemPorTipo = Object.fromEntries(
            Object.entries(parametros).map(([key, value]) => [key, Number(((value / somaTotalRegistros) * 100).toFixed(2))])
        );

        return porcentagemPorTipo;
    }
}