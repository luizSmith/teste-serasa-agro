import { Cultura } from 'src/repository/cultura/entity/cultura';
import { Fazenda } from 'src/repository/fazenda/entity/fazenda.entity';
import { Entity, JoinColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FazendaCultura {
    @PrimaryColumn('uuid')
    id_cultura: string;

    @PrimaryColumn('uuid')
    id_fazenda: string;

    @Column({ type: 'decimal', precision: 7, scale: 2, nullable: false })
    qt_vegetacao: number;

    @JoinColumn({ name: 'id_cultura' })
    cultura: Cultura;


    @JoinColumn({ name: 'id_fazenda' })
    fazenda: Fazenda;
}
