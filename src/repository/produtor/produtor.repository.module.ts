import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtor } from './entity/produtor.entity';
import { ProdutorRepository } from './produtor.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Produtor])],
    providers: [ProdutorRepository],
    exports: [ProdutorRepository],
})
export class ProdutorRepositoryModule { }