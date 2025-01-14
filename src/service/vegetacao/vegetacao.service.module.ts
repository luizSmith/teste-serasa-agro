import { Module } from '@nestjs/common';
import { VegetacaoService } from './vegetacao.service';
import { ProdutorServiceModule } from '../produtor/produtor.service.module';
import { VegetacaoRepositoryModule } from 'src/repository/vegetacao/vegetacao.repository.module';
import { FazendaServiceModule } from '../fazenda/fazenda.service.module';
import { CulturaServiceModule } from '../cultura/cultura.service.module';
import { SafraServiceModule } from '../safra/safra.service.module';

@Module({
    imports: [
        VegetacaoRepositoryModule,

        ProdutorServiceModule,
        SafraServiceModule,
        FazendaServiceModule,
        CulturaServiceModule,
    ],
    providers: [VegetacaoService],
    exports: [VegetacaoService]
})
export class VegetacaoServiceModule { }