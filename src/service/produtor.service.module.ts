import { Module } from '@nestjs/common';
import { ProdutorService } from './produtor.service';

@Module({
  providers: [ProdutorService],
  exports: [ProdutorService]
})
export class ProdutorServiceModule { }