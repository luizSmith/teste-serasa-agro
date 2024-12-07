import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exceptions";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { PainelService } from "src/service/painel/painel.service";
import { ObterPainelProdutorResponse } from "./response/obterPainelProdutor.response";

@Controller('painel')
@ApiTags('Painel')
export class PainelController {
    constructor(private readonly _painelService: PainelService) { }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterPainelProdutorResponse,
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
    async obterPainelProdutor(
    ): Promise<ObterPainelProdutorResponse> {
        return await this._painelService.obterPainelProdutor()
    }
}