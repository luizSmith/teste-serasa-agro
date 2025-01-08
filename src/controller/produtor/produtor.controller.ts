import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Obter lista de produtores',
    description: 'Retorna uma lista contendo os dados de todos os produtores ativo. Este endpoint pode ser usado para identificar todos os produtores ativos.',
  })
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
  @ApiOperation({
    summary: 'Obter produtor pelo ID',
    description: 'Retorna os dados do produtor desejado cadastrados no sistema. Este endpoint pode ser usado para consultar os dados do produtor de forma mais rápida.',
  })
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
  @ApiOperation({
    summary: 'Criar novo produtor',
    description: 'Possibilita o registro de um novo produtor, seja ele uma pessoa física pelo CPF ou uma pessoa jurídica pelo CNPJ. Apenas um dos documentos é necessário.',
  })
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
  @ApiOperation({
    summary: 'Desativa o registro do produtor',
    description: 'Possibilita desativar um produtor, impedindo a visualização dos dados das suas fazendas no painel geral',
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
  async deletarProdutorId(
    @Param() parametros: ObterProdutorIdRequest
  ): Promise<void> {
    await this._produtorService.deleteProdutorId(parametros);
  }

  @Put(':idProdutor')
  @ApiOperation({
    summary: 'Atualizar dados do produtor',
    description: 'Possibilita atualizar os dados de um produtor a partir do seu ID de registro',
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
  async atualizarProdutor(
    @Param() parametros: ObterProdutorIdRequest,
    @Body() body: AtualizarProdutorRequest
  ): Promise<void> {
    await this._produtorService.atualizarProdutor(parametros.idProdutor, body);
  }
}
