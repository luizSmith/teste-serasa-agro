import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity('fazenda_cultura', {
    database: 'db_agricultura',
})
export class FazendaCultura extends BaseEntity {
    @PrimaryColumn('uuid', { name: 'id_cultura' })
    idCultura: string;

    @PrimaryColumn('uuid', { name: 'id_fazenda' })
    idFazenda: string;

    @Column({ name: 'qt_vegetacao', type: 'decimal', precision: 7, scale: 2, nullable: false })
    quantidadeVegetacao: number;
}
