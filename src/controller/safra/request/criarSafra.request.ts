import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CriarSafraRequest {
    @ApiProperty({
        description: 'ID da Fazenda relacionado à Safra',
        example: 'd2c5d466-df4e-4c2a-9b77-7e82b9e5ae59',
    })
    @IsUUID()
    @IsNotEmpty()
    idFazenda: string;
}