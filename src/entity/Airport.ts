import { Entity, PrimaryGeneratedColumn, Column,ManyToOne,JoinColumn } from 'typeorm';
import { City } from './City.js';
import { Country } from './Country.js';
@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 4 })
    icao_code: string;

    @Column({ type: 'varchar', length: 3 })
    iata_code: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 50 })
    type: string;

    @Column({nullable:true})
    city_id: number;

    @Column({nullable:true})
    country_id: number;

    @ManyToOne(() => City)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country;


    @Column()
    continent_id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    website_url?: string;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    latitude_deg: number;

    @Column({ type: 'decimal', precision: 10, scale: 7 })
    longitude_deg: number;

    @Column()
    elevation_ft: number;

    @Column({ type: 'varchar', length: 255 })
    wikipedia_link: string;
}
