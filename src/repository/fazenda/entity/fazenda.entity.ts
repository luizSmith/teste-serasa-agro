import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('fazenda', {
    database: 'db_agricultura',
})
export class Fazenda extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 70, nullable: false })
    nome: string;

    @Column({ name: 'qt_total_hectares', type: 'decimal', precision: 7, scale: 2, nullable: false })
    qtTotalHectares: number;

    @Column({ name: 'qt_total_agricultavel', type: 'decimal', precision: 7, scale: 2, nullable: false })
    qtTotalAgricultavel: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    logradouro: string;

    @Column({ type: 'integer', nullable: false })
    numero: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    referencia: string;

    @Column({ name: 'id_produtor', type: 'uuid', nullable: false })
    produtor: string;

    @Column({ name: 'id_cidade', type: 'uuid', nullable: false })
    cidade: string;
}