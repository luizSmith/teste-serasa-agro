import { ApiProperty } from '@nestjs/swagger';
import { Cidade } from 'src/repository/cidade/entity/cidade';
import { Produtor } from 'src/repository/produtor/entity/produtor.entity';

export class FazendaResponse {
    @ApiProperty({
        description: 'ID da Fazenda',
    })
    id: string;

    @ApiProperty({
        description: 'Nome da Fazenda',
    })
    nome: string;

    @ApiProperty({
        description: 'Quantidade total de hectares da Fazenda',
    })
    qt_total_hectares: number;

    @ApiProperty({
        description: 'Quantidade total de hectares agricultáveis da Fazenda',
    })
    qt_total_agricultavel: number;

    @ApiProperty({
        description: 'Logradouro da Fazenda',
    })
    logradouro: string;

    @ApiProperty({
        description: 'Número da Fazenda',
    })
    numero: number;

    @ApiProperty({
        description: 'Referência da Fazenda',
    })
    referencia: string;

    @ApiProperty({
        description: 'Produtor da Fazenda',
        type: Produtor
    })
    produtor: Produtor;

    @ApiProperty({
        description: 'Cidade onde a Fazenda está localizada',
        type: Cidade,
    })
    cidade: Cidade;
}
