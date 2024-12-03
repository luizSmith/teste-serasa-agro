import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutorService {
  getHello(): string {
    return 'Hello World!';
  }
}
