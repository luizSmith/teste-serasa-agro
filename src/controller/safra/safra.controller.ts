import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SafraService } from "src/service/safra/safra.service";
import { CriarSafraRequest } from "./request/criarSafra.request";
import { CriarSafraResponse } from "./response/criarSafra.response";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exceptions";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { FinalizarSafraRequest } from "./request/desativarSafra.request";
import { ObterSafraAnoResponse, ObterSafraResponse } from "./response/obterSafra.response";
import { ObterSafraAnoRequest, ObterSafraFazendaIdRequest } from "./request/obterSafra.request";

@Controller('safra')
@ApiTags('Safra')
export class SafraController {
    constructor(private readonly _safraService: SafraService) { }

    @Post()
    @ApiOperation({
        summary: 'Criar uma nova safra',
        description: 'Permite a criação de uma nova safra vinculada a fazenda, contando que não haja outra safra ativa no momento.',
    })
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
    @ApiOperation({
        summary: 'Finaliza safra',
        description: 'Permite finalizar a safra para que seja possivel a criação de outra vinculada a fazenda',
    })
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
    @ApiOperation({
        summary: 'Obter safra da fazenda referente a um ano',
        description: 'Retorna a lista das culturas referentes a safra desejada e a quantidade de hectares ocupados com a cultura, se houver mais de uma safra no mesmo ano elas serão somadas',
    })
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
    async obterSafraAno(
        @Param() parametros: ObterSafraAnoRequest
    ): Promise<ObterSafraAnoResponse[]> {
        return await this._safraService.obterSafraAno(parametros);
    }

    @Get(':idFazenda/')
    @ApiOperation({
        summary: 'Obter safra da fazenda ',
        description: 'Retorna dados da safra ativa para aquela fazenda. Se não houver safra ativa ele retornará um erro',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        isArray: true,
        type: ObterSafraResponse,
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
    async obterSafraFazendaId(
        @Param() parametros: ObterSafraFazendaIdRequest
    ): Promise<ObterSafraResponse> {
        return await this._safraService.obterSafraFazendaId(parametros.idFazenda);
    }
}