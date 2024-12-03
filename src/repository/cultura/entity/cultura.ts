import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cultura {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70, unique: true })
    nome: string;
}
