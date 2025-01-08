import { Injectable, Logger } from "@nestjs/common";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exceptions";
import { CulturaRepository } from "src/repository/cultura/cultura.repository";
import { Cultura } from "src/repository/cultura/entity/cultura.entity";

@Injectable()
export class CulturaService {
    readonly logger = new Logger(CulturaService.name)

    constructor(
        private _culturaRepository: CulturaRepository,

    ) { }

    async obterCulturaId(idCultura: string): Promise<Cultura> {
        this.logger.log("inicio obter culturas Id")
        const cultura = await this._culturaRepository.obterCulturaId(idCultura);

        if (!cultura) {
            throw new RegraDeNegocioException(['IdCultura não existe'], 400);
        }

        this.logger.log("Fim obter culturas Id")
        return cultura
    }

    async obterCultura(): Promise<Cultura[]> {
        this.logger.log("inicio obter culturas")
        return await this._culturaRepository.obterCultura();
    }
}