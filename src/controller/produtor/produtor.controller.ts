import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProdutorService } from 'src/service/produtor.service';
import { ObterProdutorResponse } from './response/obterProdutor.response';
import { ObterProdutorIdRequest } from './request/obterProdutorId.request';

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
  async obterProdutor(): Promise<ObterProdutorResponse[]> {
    return await this.produtorService.obterProdutor();
  }

  @Get(':idProdutor')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sucesso',
    type: ObterProdutorResponse,
  })
  async obterProdutorId(
    @Param() parametros: ObterProdutorIdRequest
  ): Promise<ObterProdutorResponse> {
    return await this.produtorService.obterProdutorId(parametros);
  }
}
