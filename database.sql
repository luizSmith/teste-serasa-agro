CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE produtor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(70) UNIQUE NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    cpf VARCHAR(14) UNIQUE,
    criado TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT cnpj_ou_cpf CHECK (
        (cnpj IS NOT NULL AND cpf IS NULL) OR (cnpj IS NULL AND cpf IS NOT NULL)
    )
);

CREATE TABLE cultura (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(70) UNIQUE NOT NULL
);

CREATE TABLE estado (
    uf VARCHAR(2) PRIMARY KEY,
    nome VARCHAR(70) UNIQUE NOT NULL
);

CREATE TABLE cidade (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(70) UNIQUE NOT NULL,
    uf VARCHAR(2) NOT NULL,
    FOREIGN KEY (uf) REFERENCES estado(uf)
);

CREATE TABLE fazenda (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(70) UNIQUE NOT NULL,
    qt_total_hectares DECIMAL(7, 2) NOT NULL,
    qt_total_agricultavel DECIMAL(7, 2) NOT NULL,
    id_produtor UUID NOT NULL,
    id_cidade UUID NOT NULL,
    FOREIGN KEY (id_produtor) REFERENCES produtor(id)
    FOREIGN KEY (id_cidade) REFERENCES cidade(id)
);

CREATE TABLE fazenda_cultura (
    id_cultura UUID NOT NULL,
    id_fazenda UUID NOT NULL,
    qt_vegetacao DECIMAL(7, 2) NOT NULL,
    FOREIGN KEY (id_cultura) REFERENCES cultura(id),
    FOREIGN KEY (id_fazenda) REFERENCES fazenda(id)
);
