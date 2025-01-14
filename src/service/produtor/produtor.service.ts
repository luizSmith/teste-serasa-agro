import { Injectable, Logger } from '@nestjs/common';
import { AtualizarProdutorRequest } from 'src/controller/produtor/request/atualizarProdutor.request';
import { ObterProdutorIdRequest } from 'src/controller/produtor/request/obterProdutorId.request';
import { CriarProdutorResponse } from 'src/controller/produtor/response/criarProdutor.response';
import { ObterProdutorResponse } from 'src/controller/produtor/response/obterProdutor.response';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';
import { AtualizarProdutorDTO } from 'src/model/produtor/dto/atualizarProdutor.dto';
import { CriarProdutorDTO } from 'src/model/produtor/dto/criarProdutor.dto';
import { Produtor } from 'src/repository/produtor/entity/produtor.entity';
import { ProdutorRepository } from 'src/repository/produtor/produtor.repository';

@Injectable()
export class ProdutorService {
  readonly logger = new Logger(ProdutorService.name)

  constructor(private _produtorRepository: ProdutorRepository) { }

  async obterProdutor(): Promise<ObterProdutorResponse[]> {
    const produtor = await this._produtorRepository.obterProdutor();
    return produtor
  }

  async obterProdutorId(parametros: ObterProdutorIdRequest): Promise<ObterProdutorResponse> {
    const produtor = await this._produtorRepository.obterProdutorId(parametros.idProdutor);

    if (!produtor) {
      throw new RegraDeNegocioException(['Produtor não existe'], 404);
    }

    return produtor
  }

  async criarProdutor(parametros: CriarProdutorDTO): Promise<CriarProdutorResponse> {
    this._validarCpfECnpj(parametros.cnpj, parametros.cpf);

    try {
      return await this._produtorRepository.criarProdutor(parametros);

    } catch (error) {
      this.logger.fatal(error)
      throw new RegraDeNegocioException(
        ["Erro ao criar produtor"], 400
      );
    }
  }

  private _validarCpfECnpj(cnpj: string, cpf: string): void {
    const validar = ((!cnpj && !cpf) || (cnpj && cpf))

    if (validar) {
      throw new RegraDeNegocioException(['CNPJ ou CPF devem ser preenchidos'], 400);
    }
  }

  async deleteProdutorId(parametros: ObterProdutorIdRequest): Promise<void> {
    const produtor = await this._produtorRepository.obterProdutorId(parametros.idProdutor);

    if (!produtor) {
      throw new RegraDeNegocioException(['Produtor não existe'], 404);
    }

    try {
      await this._produtorRepository.deletarProdutorId(parametros.idProdutor);

    } catch (error) {
      this.logger.fatal(error)
      throw new RegraDeNegocioException(
        ["Erro ao atualizar dados do produtor"], 400
      );
    }
  }

  async atualizarProdutor(idProdutor: string, parametros: AtualizarProdutorRequest): Promise<number> {
    const produtor = await this._produtorRepository.obterProdutorId(idProdutor);

    if (!produtor) {
      throw new RegraDeNegocioException(['Produtor não existe'], 404);
    }

    this.verificarAtualizacaoCpfECnpj(produtor, parametros);

    try {

      return await this._produtorRepository.atualizarProdutor(idProdutor, parametros);

    } catch (error) {
      this.logger.fatal(error)
      throw new RegraDeNegocioException(
        ["Erro ao atualizar dados do produtor"], 400
      );
    }
  }

  private verificarAtualizacaoCpfECnpj(produtor: Produtor, parametros: AtualizarProdutorDTO): void {
    const cpfValido = produtor.cpf != null && parametros.cnpj
    if (cpfValido) {
      throw new RegraDeNegocioException(
        ['Produtor é registrado como pessoa física. Não envie CNPJ.'],
        400
      );
    }

    const cnpjValido = produtor.cnpj != null && parametros.cpf
    if (cnpjValido) {
      throw new RegraDeNegocioException(
        ['Produtor é registrado como pessoa jurídica. Não envie CPF.'],
        400
      );
    }
  }
}
