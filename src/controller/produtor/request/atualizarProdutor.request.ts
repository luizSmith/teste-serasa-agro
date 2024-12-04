import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { validaCNPJ } from 'src/infraestructure/pipe/validation/validaCNPJ.pipe';
import { IsValidCPF } from 'src/infraestructure/pipe/validation/validaCPF.pipe';

export class AtualizarProdutorRequest {
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
    @validaCNPJ()
    cnpj: string;

    @ApiProperty({
        description: 'CPF do Produtor',
    })
    @ValidateIf((o) => !o.cnpj)
    @IsNotEmpty({ message: 'CPF é obrigatório se o CNPJ não for preenchido' })
    @IsValidCPF()
    cpf: string;
}
