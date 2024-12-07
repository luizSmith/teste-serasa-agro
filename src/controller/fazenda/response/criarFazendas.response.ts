import { ApiProperty } from '@nestjs/swagger';

export class CriarFazendaResponse {
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
    qtTotalHectares: number;

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
    })
    idProdutor: string;

    @ApiProperty({
        description: 'Cidade onde a Fazenda está localizada',
    })
    idCidade: string;
}
