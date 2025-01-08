import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exceptions";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { CulturaService } from "src/service/cultura/cultura.service";
import { ObterCulturaResponse } from "./response/obterCultura.respose";

@Controller('cultura')
@ApiTags('Cultura')
export class CulturaController {
    constructor(private readonly _culturaService: CulturaService) { }

    @Get()
    @ApiOperation({
        summary: 'Obter todas as culturas disponiveis',
        description: 'Retorna uma lista de todas as culturas cadastradas no sistema. Este endpoint pode ser usado para consultar as culturas e seus respectivos detalhes.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterCulturaResponse,
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
    async obterCultura(
    ): Promise<ObterCulturaResponse[]> {
        return await this._culturaService.obterCultura();
    }
}