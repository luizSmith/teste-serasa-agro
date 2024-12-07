import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsNotEmpty } from 'class-validator';

export class CriarFazendaRequest {
    @ApiProperty({
        description: 'Nome da Fazenda',
        example: 'Fazenda Primavera',
    })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({
        description: 'Quantidade total de hectares da Fazenda',
        example: 1000.50,
    })
    @IsNumber()
    qtTotalHectares: number;

    @ApiProperty({
        description: 'Cep do endereco',
        example: '01001000',
    })
    @IsString()
    @IsNotEmpty()
    cep: string;

    @ApiProperty({
        description: 'Número da Fazenda',
        example: 1234,
    })
    @IsNumber()
    numero: number;

    @ApiProperty({
        description: 'Referência da Fazenda',
        example: 'Próximo ao rio principal',
    })
    @IsString()
    @IsNotEmpty()
    referencia: string;

    @ApiProperty({
        description: 'ID do Produtor relacionado à Fazenda',
        example: 'd2c5d466-df4e-4c2a-9b77-7e82b9e5ae59',
    })
    @IsUUID()
    @IsNotEmpty()
    idProdutor: string;
}
