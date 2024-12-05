import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Cultura } from "../cultura/entity/cultura.entity";
import { CulturaRepository } from "./cultura.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Cultura])],
    providers: [CulturaRepository],
    exports: [CulturaRepository],
})
export class CulturaRepositoryModule { }