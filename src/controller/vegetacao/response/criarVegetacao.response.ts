import { ApiProperty } from '@nestjs/swagger';

export class CriarVegetacaoResponse {
    @ApiProperty({
        description: 'ID do Fazenda',
    })
    idFazenda: string;

    @ApiProperty({
        description: 'ID do Cultura',
    })
    idCultura: string;

    @ApiProperty({
        description: 'Quantidade de vegetacao em hectares',
    })
    quantidadeVegetacao: number;
}
