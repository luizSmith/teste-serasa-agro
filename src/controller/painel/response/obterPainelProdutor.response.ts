import { ApiProperty } from '@nestjs/swagger';

export class ObterPainelProdutorResponse {
    @ApiProperty({
        description: 'Quantidade total de fazendas do produtor',
        example: 2,
    })
    quantidadeFazendas: number;

    @ApiProperty({
        description: 'Quantidade total de hectares das fazendas',
        example: 2001,
    })
    quantidadeHectares: number;

    @ApiProperty({
        description: 'Porcentagem do solo com vegetação',
        example: 34.98,
    })
    porcentagemDoSoloComVegetacao: number;

    @ApiProperty({
        description: 'Porcentagem das fazendas por estado (UF)',
        example: { SP: 100.00 },
    })
    porcentagensFazendasPorUf: Record<string, number>;

    @ApiProperty({
        description: 'Porcentagem por tipo de cultura',
        example: { Milho: 33.33, Cafe: 66.67 },
    })
    porcentagemPorTipoCultura: Record<string, number>;
}
