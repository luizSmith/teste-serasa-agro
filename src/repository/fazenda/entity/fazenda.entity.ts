import { Cidade } from 'src/repository/cidade/entity/cidade';
import { Produtor } from 'src/repository/produtor/entity/produtor.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';


@Entity()
export class Fazenda {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 70, nullable: false })
    nome: string;

    @Column({ type: 'decimal', precision: 7, scale: 2, nullable: false })
    qt_total_hectares: number;

    @Column({ type: 'decimal', precision: 7, scale: 2, nullable: false })
    qt_total_agricultavel: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    logradouro: string;

    @Column({ type: 'integer', nullable: false })
    numero: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    referencia: string;

    @JoinColumn({ name: 'id_produtor' })
    produtor: Produtor;

    @JoinColumn({ name: 'id_cidade' })
    cidade: Cidade;
}