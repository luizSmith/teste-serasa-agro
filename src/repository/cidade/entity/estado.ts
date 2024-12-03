import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Estado {
    @PrimaryColumn({ length: 2 })
    uf: string;

    @Column({ length: 70, unique: true })
    nome: string;
}
