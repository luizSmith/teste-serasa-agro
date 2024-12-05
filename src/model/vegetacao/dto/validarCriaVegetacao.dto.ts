import { ObterFazendaResponse } from "src/controller/fazenda/response/obterFazendas.response";
import { ObterVegetacaoDAO } from "../dao/ObterVegetacao.dao";

export class ValidarCriaVegetacaoDTO {
    fazenda: ObterFazendaResponse;
    vegetacao: ObterVegetacaoDAO;
    quantidadeVegetacao: number;
}