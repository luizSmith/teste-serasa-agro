import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProdutorService } from 'src/service/produtor.service';
import { ObterProdutorResponse } from './response/obterProdutor.response';
import { ObterProdutorIdRequest } from './request/obterProdutorId.request';
import { ErroPersonalizadoException } from 'src/infraestructure/exceptions/erroPersonalizado.exceptions';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';

@Controller('produtor')
@ApiTags('Produtor')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) { }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sucesso',
    type: ObterProdutorResponse,
    isArray: true,
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
  async obterProdutor(): Promise<ObterProdutorResponse[]> {
    return await this.produtorService.obterProdutor();
  }

  @Get(':idProdutor')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sucesso',
    type: ObterProdutorResponse,
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
    @Param() parametros: ObterProdutorIdRequest
  ): Promise<ObterProdutorResponse> {
    return await this.produtorService.obterProdutorId(parametros);
  }
}
