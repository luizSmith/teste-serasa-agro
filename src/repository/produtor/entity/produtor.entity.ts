import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('produtor')
export class Produtor extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70, unique: true })
    nome: string;

    @Column({ type: 'varchar', length: 18, nullable: true, unique: true })
    cnpj: string;

    @Column({ type: 'varchar', length: 14, nullable: true, unique: true })
    cpf: string;

    @Column()
    ativo: boolean;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    criado: Date;
}
