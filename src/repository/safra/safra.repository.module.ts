import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { SafraRepository } from "./safra.repository";
import { Safra } from "./entity/safra.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Safra])],
    providers: [SafraRepository],
    exports: [SafraRepository],
})
export class SafraRepositoryModule { }