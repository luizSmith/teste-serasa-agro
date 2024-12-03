import { Cidade } from 'src/repository/cidade/entity/cidade';
import { Produtor } from 'src/repository/produtor/entity/produtor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Fazenda {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70, unique: true })
    nome: string;

    @Column({ type: 'decimal', precision: 7, scale: 2 })
    qtTotalHectares: number;

    @Column({ type: 'decimal', precision: 7, scale: 2 })
    qtTotalAgricultavel: number;

    @ManyToOne(() => Produtor, { nullable: false })
    @JoinColumn({ name: 'id_produtor' })
    produtor: Produtor;

    @ManyToOne(() => Cidade, { nullable: false })
    @JoinColumn({ name: 'id_cidade' })
    cidade: Cidade;
}
