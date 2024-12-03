import { Controller, Get } from '@nestjs/common';
import { ProdutorService } from 'src/service/produtor.service';

@Controller()
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) { }

  @Get()
  getHello(): string {
    return this.produtorService.getHello();
  }
}
