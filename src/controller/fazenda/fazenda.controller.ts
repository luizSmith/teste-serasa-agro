import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exceptions";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { FazendaService } from "src/service/fazenda/fazenda.service";
import { ObterFazendasRequest } from "./request/obterFazendas.request";
import { ObterFazendaResponse } from "./response/obterFazendas.response";
import { CriarFazendaRequest } from "./request/criarFazendas.request";
import { Fazenda } from "src/repository/fazenda/entity/fazenda.entity";

@Controller('fazenda')
@ApiTags('Fazenda')
export class FazendaController {
    constructor(private readonly _fazendaService: FazendaService) { }

    @Get('produtor/:idProdutor')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterFazendaResponse,
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
    async obterFazendas(
        @Param() parametros: ObterFazendasRequest
    ): Promise<Fazenda[]> {
        return await this._fazendaService.obterFazendas(parametros);
    }

    @Post()
    async criarFazenda(
        @Body() parametros: CriarFazendaRequest
    ): Promise<void> {
        await this._fazendaService.criarFazenda(parametros);
    }
}