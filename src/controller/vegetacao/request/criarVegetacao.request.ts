import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CriarVegetacaoRequest {
    @ApiProperty({
        description: 'ID do Fazenda',
    })
    @IsUUID('4', { message: 'O idFazenda deve ser um UUID válido.' })
    @IsNotEmpty({ message: 'O idFazenda é obrigatório.' })
    idFazenda: string;

    @ApiProperty({
        description: 'ID do Cultura',
    })
    @IsUUID('4', { message: 'O idCultura deve ser um UUID válido.' })
    @IsNotEmpty({ message: 'O idCultura é obrigatório.' })
    idCultura: string;

    @ApiProperty({
        description: 'Quantidade de vegetacao em hectares',
    })
    @IsNumber({}, { message: 'A quantidadeVegetacao deve ser um número.' })
    @Min(0, { message: 'A quantidadeVegetacao deve ser maior ou igual a zero.' })
    quantidadeVegetacao: number;
}
