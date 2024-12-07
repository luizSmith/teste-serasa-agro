import { Injectable } from "@nestjs/common";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { CulturaRepository } from "src/repository/cultura/cultura.repository";
import { Cultura } from "src/repository/cultura/entity/cultura.entity";

@Injectable()
export class CulturaService {
    constructor(
        private _culturaRepository: CulturaRepository,
    ) { }

    async obterCulturaId(idCultura: string): Promise<Cultura> {
        const cultura = await this._culturaRepository.obterCulturaId(idCultura);

        if (!cultura) {
            throw new RegraDeNegocioException(['IdCultura não existe'], 400);
        }

        return cultura
    }

    async obterCultura(): Promise<Cultura[]> {
        return await this._culturaRepository.obterCultura();
    }
}