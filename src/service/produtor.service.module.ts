import { Module } from '@nestjs/common';
import { ProdutorService } from './produtor.service';
import { ProdutorRepositoryModule } from 'src/repository/produtor/produtor.repository.module';

@Module({
  imports: [ProdutorRepositoryModule],
  providers: [ProdutorService],
  exports: [ProdutorService]
})
export class ProdutorServiceModule { }