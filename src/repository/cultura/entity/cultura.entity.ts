import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('cultura', {
    database: 'db_agricultura',
})
export class Cultura extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70, unique: true })
    nome: string;
}
