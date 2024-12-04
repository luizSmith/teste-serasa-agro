
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';
import { RegraDeNegocioException } from '../exceptions/regraDeNegocio.exceptions';


@Injectable()
export class ValidacaoCustomizadaPipe implements PipeTransform {
    async transform(
        value: unknown,
        { metatype }: ArgumentMetadata
    ): Promise<unknown> {
        if (!metatype) return;

        const objeto = plainToClass(metatype, value);
        const erros = await validate(objeto, {
            skipMissingProperties: false,
            skipUndefinedProperties: false,
        });
        if (erros.length > 0) {
            const mensagem = erros.map(
                (err) => err.constraints && Object.values(err.constraints)
            );
            throw new RegraDeNegocioException(mensagem.flat(), 400);
        }
        return objeto;
    }
}
