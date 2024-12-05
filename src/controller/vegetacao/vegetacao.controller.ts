import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exceptions";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { VegetacaoService } from "src/service/vegetacao/vegetacao.service";
import { ObterVegetacaoRequest } from "./request/obterVegetacao.request";
import { ObterVegetacaoResponse } from "./response/obterVegetacao.response";

@Controller('vegetacao')
@ApiTags('Vegetacao')
export class VegetacaoController {
    constructor(private readonly _vegetacaoService: VegetacaoService) { }

    @Get('produtor/:idProdutor')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterVegetacaoResponse,
        isArray: true
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        description: 'BAD_GATEWAY',
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'NOT_FOUND',
        type: RegraDeNegocioException,
    })
    async obterVegetacao(
        @Param() parametros: ObterVegetacaoRequest
    ): Promise<ObterVegetacaoResponse[]> {
        return await this._vegetacaoService.obterVegetacao(parametros)
    }
}