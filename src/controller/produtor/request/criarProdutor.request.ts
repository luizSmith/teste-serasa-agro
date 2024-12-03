import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CriarProdutorRequest {
    @ApiProperty({
        description: 'nome do Produtor'
    })
    @IsNotEmpty({ message: 'Parâmetro nome é obrigatório' })
    nome: string;

    @ApiProperty({
        description: 'CNPJ do Produtor',
    })
    @ValidateIf((o) => !o.cpf)
    @IsNotEmpty({ message: 'CNPJ é obrigatório se o CPF não for preenchido' })
    @IsString()
    cnpj: string;

    @ApiProperty({
        description: 'CPF do Produtor',
    })
    @ValidateIf((o) => !o.cnpj)
    @IsNotEmpty({ message: 'CPF é obrigatório se o CNPJ não for preenchido' })
    @IsString()
    cpf: string;
}
