import { ApiProperty } from '@nestjs/swagger';

export class ObterVegetacaoResponse {
    @ApiProperty({
        description: 'ID da Vegetação',
    })
    id: string;

    @ApiProperty({
        description: 'Nome da Vegetação',
    })
    nome: string;

    @ApiProperty({
        description: 'Quantidade de Vegetação',
    })
    quantidadeVegetacao: number;
}
