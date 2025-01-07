import { Module } from '@nestjs/common';

import { FazendaServiceModule } from '../fazenda/fazenda.service.module';
import { SafraRepositoryModule } from 'src/repository/safra/safra.repository.module';
import { SafraService } from './safra.service';

@Module({
    imports: [
        SafraRepositoryModule,

        FazendaServiceModule,
    ],
    providers: [SafraService],
    exports: [SafraService]
})
export class SafraServiceModule { }