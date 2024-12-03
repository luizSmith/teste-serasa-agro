import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProdutorService } from 'src/service/produtor.service';

@Controller('produtor')
@ApiTags('Produtor')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) { }

  @Get()
  getHello(): string {
    return this.produtorService.getHello();
  }
}
