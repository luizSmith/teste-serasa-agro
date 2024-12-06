import { ApiProperty } from "@nestjs/swagger";

export class ObterCulturaResponse {
    @ApiProperty({
        description: 'Id Cultura',
    })
    id: string;

    @ApiProperty({
        description: 'Nome Cultura',
    })
    nome: string;
}
