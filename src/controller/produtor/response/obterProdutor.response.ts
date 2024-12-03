import { ApiProperty } from '@nestjs/swagger';

export class ObterProdutorResponse {
    @ApiProperty({
        description: 'ID do Produtor',
    })
    id: string;

    @ApiProperty({
        description: 'nome do Produtor'
    })
    nome: string;

    @ApiProperty({
        description: 'CNPJ do Produtor',
    })
    cnpj: string;

    @ApiProperty({
        description: 'CPF do Produtor',
    })
    cpf: string;

    @ApiProperty({
        description: 'CNPJ do Produtor',
    })
    criado: Date;

}
