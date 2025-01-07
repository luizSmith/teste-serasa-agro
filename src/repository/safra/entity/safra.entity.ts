import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
@Entity('safra')
export class Safra extends BaseEntity {

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column('uuid', { name: 'id_fazenda' })
    idFazenda: string;

    @Column('timestamp with time zone', { name: 'dt_inicio', default: () => 'CURRENT_TIMESTAMP' })
    dtInicio: Date;

    @Column('timestamp with time zone', { name: 'dt_fim', nullable: true })
    dtFim?: Date;

    @Column('boolean', { name: 'ativo', default: true })
    ativo: boolean;
}
