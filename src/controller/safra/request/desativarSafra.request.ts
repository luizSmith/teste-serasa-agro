import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FinalizarSafraRequest {
    @ApiProperty({
        description: 'ID da Safra',
    })
    @IsNotEmpty({ message: 'Parâmetro id é obrigatório' })
    @IsUUID(4, { message: "idSafra deve ser um uuid 4" })
    idSafra: string;
}