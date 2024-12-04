import { Module } from '@nestjs/common';
import { FazendaServiceModule } from 'src/service/fazenda/fazenda.service.module';
import { FazendaController } from './fazenda.controller';

@Module({
    controllers: [FazendaController],
    imports: [FazendaServiceModule],
})
export class FazendaControllerModule { }