import { Module } from '@nestjs/common';
import { SafraServiceModule } from 'src/service/safra/safra.service.module';
import { SafraController } from './safra.controller';

@Module({
    controllers: [SafraController],
    imports: [SafraServiceModule],
})
export class SafraControllerModule { }