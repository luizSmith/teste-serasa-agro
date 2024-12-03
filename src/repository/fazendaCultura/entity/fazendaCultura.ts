import { Cultura } from 'src/repository/cultura/entity/cultura';
import { Fazenda } from 'src/repository/fazenda/entity/fazenda';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity()
export class FazendaCultura {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cultura, { nullable: false })
    @JoinColumn({ name: 'id_cultura' })
    cultura: Cultura;

    @ManyToOne(() => Fazenda, { nullable: false })
    @JoinColumn({ name: 'id_fazenda' })
    fazenda: Fazenda;

    @Column({ type: 'decimal', precision: 7, scale: 2 })
    qtVegetacao: number;
}
