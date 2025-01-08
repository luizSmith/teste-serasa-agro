import { ApiProperty } from '@nestjs/swagger';

export class CriarSafraResponse {

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
