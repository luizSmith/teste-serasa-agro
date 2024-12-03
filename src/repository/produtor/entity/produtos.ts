import { Entity, PrimaryGeneratedColumn, Column, Check } from 'typeorm';

@Entity()
export class Produtor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70, unique: true })
    nome: string;

    @Column({ type: 'varchar', length: 18, nullable: true, unique: true })
    cnpj: string;

    @Column({ type: 'varchar', length: 14, nullable: true, unique: true })
    cpf: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    criado: Date;

    @Check('cnpj IS NOT NULL AND cpf IS NULL OR cnpj IS NULL AND cpf IS NOT NULL')
    @Column({ type: 'boolean', default: false })
    isValidCnpjCpf: boolean;
}
