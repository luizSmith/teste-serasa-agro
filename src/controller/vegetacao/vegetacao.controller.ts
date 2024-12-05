import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exceptions";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { VegetacaoService } from "src/service/vegetacao/vegetacao.service";
import { ObterVegetacaoRequest } from "./request/obterVegetacao.request";
import { ObterVegetacaoResponse } from "./response/obterVegetacao.response";
import { CriarVegetacaoRequest } from "./request/criarVegetacao.request";
import { CriarVegetacaoResponse } from "./response/criarVegetacao.response";

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
    async obterVegetacaoProdutor(
        @Param() parametros: ObterVegetacaoRequest
    ): Promise<ObterVegetacaoResponse[]> {
        return await this._vegetacaoService.obterVegetacaoProdutor(parametros)
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Sucesso',
        type: CriarVegetacaoResponse,
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
    async criarProdutor(@Body() parametros: CriarVegetacaoRequest): Promise<CriarVegetacaoResponse> {
        return await this._vegetacaoService.criarVegetacao(parametros);
    }
}