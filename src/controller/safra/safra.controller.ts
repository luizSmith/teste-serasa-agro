import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { SafraService } from "src/service/safra/safra.service";
import { CriarSafraRequest } from "./request/criarSafra.request";
import { CriarSafraResponse } from "./response/criarSafra.response";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exceptions";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { FinalizarSafraRequest } from "./request/desativarSafra.request";
import { ObterSafraAnoResponse } from "./response/obterSafra.response";
import { ObterSafraAnoRequest } from "./request/obterSafra.request";

@Controller('safra')
@ApiTags('Safra')
export class SafraController {
    constructor(private readonly _safraService: SafraService) { }

    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Sucesso',
        type: CriarSafraResponse,
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
    async criarFazenda(
        @Body() parametros: CriarSafraRequest
    ): Promise<CriarSafraResponse> {
        return await this._safraService.criarSafra(parametros)
    }


    @Delete(':idSafra')
    @HttpCode(204)
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Sucesso'
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
    async finalizarSafra(
        @Param() parametros: FinalizarSafraRequest
    ): Promise<void> {
        await this._safraService.finalizarSafra(parametros);
    }

    @Get(':idFazenda/:ano')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        isArray: true,
        type: ObterSafraAnoResponse,
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
    async obterProdutorId(
        @Param() parametros: ObterSafraAnoRequest
    ): Promise<ObterSafraAnoResponse[]> {
        return await this._safraService.obterSafraAno(parametros);
    }
}