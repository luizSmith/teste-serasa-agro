CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE produtor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(70) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    cpf VARCHAR(14) UNIQUE,
    ativo BOOLEAN,
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
    nome VARCHAR(70) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    FOREIGN KEY (uf) REFERENCES estado(uf) ON DELETE CASCADE
);

CREATE TABLE fazenda (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(70) NOT NULL,
    qt_total_hectares DECIMAL(7, 2) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    numero INTEGER NOT NULL,
    referencia VARCHAR(200) NOT NULL,
    id_produtor UUID NOT NULL,
    id_cidade UUID NOT NULL,
    FOREIGN KEY (id_produtor) REFERENCES produtor(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cidade) REFERENCES cidade(id) ON DELETE CASCADE
);

CREATE TABLE safra (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_fazenda UUID NOT NULL,
    dt_inicio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    dt_fim TIMESTAMP,
    ativo BOOLEAN,
    FOREIGN KEY (id_fazenda) REFERENCES fazenda(id) ON DELETE CASCADE
)

CREATE TABLE safra_cultura (
    id_safra UUID NOT NULL,
    id_cultura UUID NOT NULL,
    qt_vegetacao DECIMAL(7, 2) NOT NULL,
    FOREIGN KEY (id_cultura) REFERENCES cultura(id) ON DELETE CASCADE,
    FOREIGN KEY (id_safra) REFERENCES safra(id) ON DELETE CASCADE
);

INSERT INTO cultura (nome)
VALUES
  ('Soja'),
  ('Milho'),
  ('Algodão'),
  ('Café'),
  ('Cana de Açúcar');
  
 
 INSERT INTO estado (uf, nome) VALUES
('AC', 'Acre'),
('AL', 'Alagoas'),
('AP', 'Amapá'),
('AM', 'Amazonas'),
('BA', 'Bahia'),
('CE', 'Ceará'),
('DF', 'Distrito Federal'),
('ES', 'Espírito Santo'),
('GO', 'Goiás'),
('MA', 'Maranhão'),
('MT', 'Mato Grosso'),
('MS', 'Mato Grosso do Sul'),
('MG', 'Minas Gerais'),
('PA', 'Pará'),
('PB', 'Paraíba'),
('PR', 'Paraná'),
('PE', 'Pernambuco'),
('PI', 'Piauí'),
('RJ', 'Rio de Janeiro'),
('RN', 'Rio Grande do Norte'),
('RS', 'Rio Grande do Sul'),
('RO', 'Rondônia'),
('RR', 'Roraima'),
('SC', 'Santa Catarina'),
('SP', 'São Paulo'),
('SE', 'Sergipe'),
('TO', 'Tocantins');
