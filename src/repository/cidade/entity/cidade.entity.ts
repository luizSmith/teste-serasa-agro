import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('cidade', {
    database: 'db_agricultura',
})
export class Cidade extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70 })
    nome: string;

    @Column({ length: 2 })
    uf: string;
}
