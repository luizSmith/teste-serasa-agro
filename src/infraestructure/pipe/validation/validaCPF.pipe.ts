import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint()
export class IsValidCPFConstraint implements ValidatorConstraintInterface {
    validate(cpfNumber: string): boolean {
        return validateCPF(cpfNumber);
    }
}

export function IsValidCPF(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions, message: 'CPF inválido' },
            constraints: [],
            validator: IsValidCPFConstraint,
        });
    };
}

const validateCPF = (cpfNumber: string): boolean => {
    return cpf.isValid(cpfNumber);
};

export function formatarCPF(numeroCPF: string | number): string {
    return cpf.format(`${numeroCPF}`);
}

export function desformatarCPF(numeroCPF: string): string {
    const cpf = numeroCPF.replace(/(-)|(\.)/g, '');
    return cpf;
}
