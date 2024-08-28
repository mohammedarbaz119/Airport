import "reflect-metadata"
import { DataSource } from "typeorm"
import { Airport } from "./entity/Airport.js"
import { City } from "./entity/City.js"
import { Country } from "./entity/Country.js"
import * as dotenv from "dotenv"
dotenv.config();
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    synchronize: true,
    logging: false,
    entities: [Airport,City,Country],
})
