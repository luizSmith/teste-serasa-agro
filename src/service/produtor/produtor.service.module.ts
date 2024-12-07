import { Module } from '@nestjs/common';

import { ProdutorRepositoryModule } from 'src/repository/produtor/produtor.repository.module';
import { ProdutorService } from './produtor.service';

@Module({
  imports: [ProdutorRepositoryModule],
  providers: [ProdutorService],
  exports: [ProdutorService]
})
export class ProdutorServiceModule { }