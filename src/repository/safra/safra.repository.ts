import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Safra } from "./entity/safra.entity";
import { Repository } from "typeorm";
import { CriarSafraDTO } from "src/model/safra/dto/criarSafra.dto";

@Injectable()
export class SafraRepository {
    constructor(
        @InjectRepository(Safra)
        private readonly _safraRepository: Repository<Safra>
    ) { }

    async criarSafra(parametros: CriarSafraDTO): Promise<Safra> {
        return this._safraRepository.create(parametros).save();
    }
}