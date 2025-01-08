export class ObterSafraIdDAO {
    id: string;
    idFazenda: string;
    dtInicio: Date;
    dtFim?: Date;
    ativo: boolean;
}

export class ObterSafraAnoDAO {
    idFazenda: string;
    nomeFazenda: string;
    nomeCultura: string;
    ano: string;
    quantidadePlantada: number
}