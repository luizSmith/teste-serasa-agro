import { Module } from '@nestjs/common';
import { ProdutorServiceModule } from 'src/service/produtor/produtor.service.module';
import { ProdutorController } from './produtor.controller';

@Module({
    controllers: [ProdutorController],
    imports: [ProdutorServiceModule],
})
export class ProdutorControllerModule { }