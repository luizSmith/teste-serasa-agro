import { Injectable } from '@nestjs/common';
import { ObterProdutorIdRequest } from 'src/controller/produtor/request/obterProdutorId.request';
import { CriarProdutorResponse } from 'src/controller/produtor/response/criarProdutor.response';
import { ObterProdutorResponse } from 'src/controller/produtor/response/obterProdutor.response';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exceptions';
import { CriarProdutorDTO } from 'src/model/produtor/criarProdutor.dto';
import { ProdutorRepository } from 'src/repository/produtor/produtor.repository';

@Injectable()
export class ProdutorService {
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
    this.validarCpfECnpj(parametros.cnpj, parametros.cpf);

    return await this._produtorRepository.criarProdutor(parametros);
  }

  private validarCpfECnpj(cnpj: string, cpf: string): void {
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

    await this._produtorRepository.deletarProdutorId(parametros.idProdutor);
  }
}
