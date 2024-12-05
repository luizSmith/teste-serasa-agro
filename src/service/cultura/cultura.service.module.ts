import { Module } from '@nestjs/common';
import { CulturaService } from './cultura.service';
import { CulturaRepositoryModule } from 'src/repository/cultura/cultura.repository.module';

@Module({
    imports: [
        CulturaRepositoryModule
    ],
    providers: [CulturaService],
    exports: [CulturaService]
})
export class CulturaServiceModule { }