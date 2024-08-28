import { Request, Response, Router } from "express";
import { AppDataSource } from "./data-source.js";
import { Airport } from "./entity/Airport.js";
const router = Router()
const AirportRepository = AppDataSource.getRepository(Airport)

router.get("/", (req: Request, res: Response) => {
    res.send("runing server")
})
router.get('/favicon.ico', (req, res) => {
    res.sendStatus(204); // No content
});
router.get("/:iata_code", async (req: Request, res: Response) => {
    const iata_code: string = (req.params.iata_code as string).toUpperCase()
    if (iata_code === "" || iata_code.length > 3 || iata_code.length < 3) {
        return res.status(400).json({ message: "invalid iata_code" })
    }
    const result = await AirportRepository.findOne({
        where: {
            iata_code: iata_code
        },
        relations: {
            city: true,
            country: true
        }
    })
    res.json({
        airport: {
            id: result.id,
            icao_code: result.icao_code,
            iata_code: result.iata_code,
            name: result.name,
            type: result.type,
            latitude_deg: Number(result.latitude_deg),
            longitude_deg: Number(result.longitude_deg),
            elevation_ft: result.elevation_ft,
            address: {
                city: result.city ? {
                    id: result.city.id,
                    name: result.city.name,
                    country_id: result.city.country_id,
                    is_active: result.city.is_active,
                    lat: parseFloat(Number(result.city.lat).toFixed(2)),
                    long: parseFloat(Number(result.city.long).toFixed(2))
                } : null,
                country: result.country ? {
                    id: result.country.id,
                    name: result.country.name,
                    country_code_two: result.country.country_code_two,
                    country_code_three: result.country.country_code_three,
                    mobile_code: result.country.mobile_code,
                    continent_id: result.country.continent_id
                } : null
            }
        }
    })
})


export default router


