import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Estado } from './Estado';

@Entity()
export class Cidade {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70, unique: true })
    nome: string;

    @ManyToOne(() => Estado, { nullable: false })
    @JoinColumn({ name: 'uf' })
    estado: Estado;
}
