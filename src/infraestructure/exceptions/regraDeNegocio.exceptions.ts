import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString } from 'class-validator';
import { ErroPersonalizadoException } from './erroPersonalizado.exceptions';

export class RegraDeNegocioException extends ErroPersonalizadoException {
    @ApiProperty({
        description: 'Redundância do status code da requisição',
    })
    @IsNumber()
    statusCode: number;

    @ApiProperty({
        description: 'Uma array com a descrição de todos os erros',
        type: [String],
    })
    @IsArray()
    message;

    @ApiProperty({
        description: 'Nome do erro http',
        type: String,
    })
    @IsString()
    error: string;

    @ApiProperty({
        description: 'Momento em que a API detectou o erro',
    })
    @IsString()
    timeStamp: string;

    constructor(message: Array<unknown>, status: number) {
        super(message, status, 'Business Exception');
        this.error = 'Business Exception';
        this.message = message;
        this.statusCode = status;
    }
}
