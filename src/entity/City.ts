import { Entity, PrimaryGeneratedColumn, Column,JoinColumn,ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Country } from './Country.js';
@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    alt_name?: string;

    @Column()
    country_id: number;

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @Column({ type: 'boolean' })
    is_active: boolean;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp'})
    updated_at: Date;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    lat: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    long: number;
}
