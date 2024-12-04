import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity('estado', {
    database: 'db_agricultura',
})
export class Estado extends BaseEntity {
    @PrimaryColumn({ length: 2 })
    uf: string;

    @Column({ length: 70, unique: true })
    nome: string;
}
