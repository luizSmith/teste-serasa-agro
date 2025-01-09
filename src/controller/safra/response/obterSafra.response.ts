import { ApiProperty } from '@nestjs/swagger';
export class ObterSafraResponse {
    @ApiProperty({
        description: 'Id da Safra',
    })
    id: string;

    @ApiProperty({
        description: 'Id da Fazenda associada à Safra',
    })
    idFazenda: string;

    @ApiProperty({
        description: 'Data de início da Safra',
    })
    dtInicio: Date;

    @ApiProperty({
        description: 'Data de término da Safra',
        required: false,
    })
    dtFim?: Date;

    @ApiProperty({
        description: 'Indica se a Safra está ativa ou não',
        type: Boolean,
    })
    ativo: boolean;
}

export class ObterSafraAnoResponse {
  
    @ApiProperty({
        description: 'ID da Fazenda',
    })
    idFazenda: string;

    @ApiProperty({
        description: 'Nome da Fazenda',
    })
    nomeFazenda: string;

    @ApiProperty({
        description: 'Nome da Cultura',
    })
    nomeCultura: string;

    @ApiProperty({
        description: 'Ano da Safra',
    })
    ano: string;

    @ApiProperty({
        description: 'Quantidade Plantada (em hectares ou outra unidade)',
    })
    quantidadePlantada: number;
}
