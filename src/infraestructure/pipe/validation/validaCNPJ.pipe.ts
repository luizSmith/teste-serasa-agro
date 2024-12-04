import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint()
export class validaCNPJConstraint implements ValidatorConstraintInterface {
    validate(cnpjNumber: string): boolean {
        return validateCNPJ(cnpjNumber);
    }
}

export function validaCNPJ(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'CNPJ inválido' },
            constraints: [],
            validator: validaCNPJConstraint,
        });
    };
}

const validateCNPJ = (cnpjNumber: string): boolean => {
    return cnpj.isValid(cnpjNumber);
};

export function formatarCNPJ(numeroCNPJ: string | number): string {
    return cnpj.format(`${numeroCNPJ}`);
}

export function desformatarCNPJ(numeroCNPJ: string): string {
    const cnpj = numeroCNPJ.replace(/(-)|(\.)/g, '');
    return cnpj;
}
