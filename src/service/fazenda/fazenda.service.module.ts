import { Module } from '@nestjs/common';

import { FazendaService } from './fazenda.service';
import { FazendaRepositoryModule } from 'src/repository/fazenda/fazenda.repository.module';
import { ProdutorServiceModule } from '../produtor/produtor.service.module';

@Module({
    imports: [FazendaRepositoryModule, ProdutorServiceModule],
    providers: [FazendaService],
    exports: [FazendaService]
})
export class FazendaServiceModule { }