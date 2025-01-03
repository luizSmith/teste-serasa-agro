import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObterProdutorResponse } from './response/obterProdutor.response';
import { ObterProdutorIdRequest } from './request/obterProdutorId.request';
import { ErroPersonalizadoException } from 'src/infraestructure/exceptions/erroPersonalizado.exceptions';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';
import { CriarProdutorResponse } from './response/criarProdutor.response';
import { CriarProdutorRequest } from './request/criarProdutor.request';
import { AtualizarProdutorRequest } from './request/atualizarProdutor.request';
import { ProdutorService } from 'src/service/produtor/produtor.service';

@Controller('produtor')
@ApiTags('Produtor')
export class ProdutorController {
  constructor(private readonly _produtorService: ProdutorService) { }

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
    return await this._produtorService.obterProdutor();
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
    return await this._produtorService.obterProdutorId(parametros);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sucesso',
    type: CriarProdutorResponse,
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
  async criarProdutor(@Body() parametros: CriarProdutorRequest): Promise<CriarProdutorResponse> {
    return await this._produtorService.criarProdutor(parametros);
  }

  @Delete(':idProdutor')
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
  async deletarProdutorId(
    @Param() parametros: ObterProdutorIdRequest
  ): Promise<void> {
    await this._produtorService.deleteProdutorId(parametros);
  }

  @Put(':idProdutor')
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
  async atualizarProdutor(
    @Param() parametros: ObterProdutorIdRequest,
    @Body() body: AtualizarProdutorRequest
  ): Promise<void> {
    await this._produtorService.atualizarProdutor(parametros.idProdutor, body);
  }
}
