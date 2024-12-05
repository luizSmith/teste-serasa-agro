import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ObterPainelProdutorRequest {
    @ApiProperty({
        description: 'ID do Produtor',
    })
    @IsNotEmpty({ message: 'Parâmetro id é obrigatório' })
    @IsUUID(4, { message: "idProdutor deve ser um uuid 4" })
    idProdutor: string;
}
