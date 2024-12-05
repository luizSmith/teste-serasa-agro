import { Module } from '@nestjs/common';
import { PainelService } from './painel.service';
import { PainelRepositoryModule } from 'src/repository/painel/painel.repository.module';

@Module({
    imports: [
        PainelRepositoryModule,
    ],
    providers: [PainelService],
    exports: [PainelService]
})
export class PainelServiceModule { }