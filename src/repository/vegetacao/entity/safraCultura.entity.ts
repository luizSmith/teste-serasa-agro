import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity('safra_cultura')
export class SafraCultura extends BaseEntity {
    @PrimaryColumn('uuid', { name: 'id_safra' })
    idSafra: string;

    @PrimaryColumn('uuid', { name: 'id_cultura' })
    idCultura: string;

    @Column({ name: 'qt_vegetacao', type: 'decimal', precision: 7, scale: 2, nullable: false })
    quantidadeVegetacao: number;
}
