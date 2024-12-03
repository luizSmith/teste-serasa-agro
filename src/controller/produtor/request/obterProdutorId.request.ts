import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ObterProdutorIdRequest {
    @ApiProperty({
        description: 'ID do Produtor',
    })
    @IsNotEmpty({ message: 'Parâmetro id é obrigatório' })
    idProdutor: string;
}
