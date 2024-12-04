import { Module } from '@nestjs/common';

import { FazendaService } from './fazenda.service';
import { FazendaRepositoryModule } from 'src/repository/fazenda/fazenda.repository.module';
import { ProdutorServiceModule } from '../produtor/produtor.service.module';
import { ViaCepClientModule } from 'src/repository/client/viaCep/viaCep.client.module';
import { CidadeServiceModule } from '../cidade/cidade.service.module';

@Module({
    imports: [
        FazendaRepositoryModule,

        ViaCepClientModule,

        ProdutorServiceModule,
        CidadeServiceModule,
    ],
    providers: [FazendaService],
    exports: [FazendaService]
})
export class FazendaServiceModule { }