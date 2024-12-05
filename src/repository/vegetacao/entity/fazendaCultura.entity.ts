import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class FazendaCultura extends BaseEntity {
    @PrimaryColumn('uuid')
    idCultura: string;

    @PrimaryColumn('uuid')
    idFazenda: string;

    @Column({ type: 'decimal', precision: 7, scale: 2, nullable: false })
    quantidadeVegetacao: number;
}
