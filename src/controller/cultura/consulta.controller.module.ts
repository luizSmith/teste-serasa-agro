import { Module } from '@nestjs/common';
import { CulturaController } from './cultura.controller';
import { CulturaServiceModule } from 'src/service/cultura/cultura.service.module';

@Module({
    controllers: [CulturaController],
    imports: [CulturaServiceModule],
})
export class CulturaControllerModule { }