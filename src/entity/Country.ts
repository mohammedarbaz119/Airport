import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Airport } from './Airport.js';
import { City } from './City.js';

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    alt_name?: string;

    @Column({ type: 'varchar', length: 2 })
    country_code_two: string;

    @Column({ type: 'varchar', length: 3 })
    country_code_three: string;

    @Column({ type: 'varchar', length: 10 })
    flag_app: string;

    @OneToMany(()=>Airport,airport=>airport.country)
    airports:Airport[]

    @OneToMany(()=> City,city=>city.country)
    cities:City[]

    @Column()
    mobile_code: number;

    @Column()
    continent_id: number;

    @Column({ type: 'varchar', length: 20 })
    country_flag: string;
}
