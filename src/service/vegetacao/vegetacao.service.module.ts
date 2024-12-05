import { Module } from '@nestjs/common';
import { VegetacaoService } from './vegetacao.service';
import { ProdutorServiceModule } from '../produtor/produtor.service.module';
import { VegetacaoRepositoryModule } from 'src/repository/vegetacao/vegetacao.repository.module';

@Module({
    imports: [
        VegetacaoRepositoryModule,

        ProdutorServiceModule,
    ],
    providers: [VegetacaoService],
    exports: [VegetacaoService]
})
export class VegetacaoServiceModule { }