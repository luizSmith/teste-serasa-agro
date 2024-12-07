import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('cidade')
export class Cidade extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70 })
    nome: string;

    @Column({ length: 2 })
    uf: string;
}
