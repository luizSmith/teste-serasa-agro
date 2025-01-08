import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ObterSafraAnoRequest {
    @ApiProperty({
        description: 'Id da Fazenda associada à Safra',
    })
    @IsNotEmpty()
    @IsString()
    idFazenda: string;

    @ApiProperty({
        description: 'Ano de início da Safra',
    })
    @IsString()
    ano: string;
}

