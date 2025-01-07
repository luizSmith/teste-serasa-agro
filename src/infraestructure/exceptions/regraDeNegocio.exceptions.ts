import { ErroPersonalizadoException } from './erroPersonalizado.exceptions';

export class RegraDeNegocioException extends ErroPersonalizadoException {
    constructor(message: Array<unknown>, status: number) {
        super(message, status, 'Business Exception');
        this.error = 'Business Exception';
        this.message = message;
        this.statusCode = status;

        if (status >= 500) {
            this.logger.fatal(message, status);
        }
    }
}
