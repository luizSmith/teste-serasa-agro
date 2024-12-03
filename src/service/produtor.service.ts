import { Injectable } from '@nestjs/common';
import { ObterProdutorIdRequest } from 'src/controller/produtor/request/obterProdutorId.request';
import { ObterProdutorResponse } from 'src/controller/produtor/response/obterProdutor.response';
import { ProdutorRepository } from 'src/repository/produtor/produtor.repository';

@Injectable()
export class ProdutorService {
  constructor(private _produtorRepository: ProdutorRepository) { }

  async obterProdutor(): Promise<ObterProdutorResponse[]> {
    const produtor = await this._produtorRepository.obterProdutor();
    return produtor
  }

  async obterProdutorId(parametros: ObterProdutorIdRequest): Promise<ObterProdutorResponse> {
    const produtor = await this._produtorRepository.obterProdutorId(parametros.id);
    return produtor
  }
}
