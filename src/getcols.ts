import { Country } from "./entity/Country.js";
import { AppDataSource } from "./data-source.js";
import { City } from "./entity/City.js";
import { Airport } from "./entity/Airport.js";


export function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569)*86400*1000));
}
export async function importCountriesFromExcel(data: unknown[]) {
  const countryRepository = AppDataSource.getRepository(Country);

  // Skip the header row
  data.shift();

  for (const row of data) {
    // Clean and map data
    const country = new Country();
    country.id = row[0];
    country.name = row[1].trim();
    country.alt_name = row[2]?.trim() || null; // Nullable
    country.country_code_two = row[3].trim();
    country.country_code_three = row[4].trim();
    country.flag_app = row[5].trim();
    country.mobile_code = Number(row[6]?.toString().trim());
    country.continent_id = Number(row[7]?.toString().trim());
    country.country_flag = row[8]?.trim() || "";

    // Save to database
    await countryRepository.save(country);
    console.log(`Country ${country.name} saved successfully!`);
  }
}

export async function importAirportsFromExcel(data: unknown[]) {
  const AirportRepository = AppDataSource.getRepository(Airport);
  const airports:Airport[]= []
  // Skip the header row
  data.shift();

  for (const row of data) {
    // Clean and map data
    const airport = new Airport();
    airport.id = row[0];
    airport.icao_code=row[1]
    airport.iata_code=row[2]
    airport.name = row[3].trim();
    airport.type = row[4];
    airport.continent_id= Number(row[7]);
    airport.website_url= row[8]?row[8]:null
    airport.created_at = ExcelDateToJSDate(row[9]);
    airport.updated_at = ExcelDateToJSDate(row[10]);
    airport.latitude_deg = row[11];
    airport.longitude_deg = row[12];
    airport.elevation_ft=row[13];
    airport.wikipedia_link = row[14];
    const city = await AppDataSource.getRepository(City).findOne({
      where:{
        id:row[5]
      }
    })
   const country=await AppDataSource.getRepository(Country).findOne({
    where:{
      id:row[6]
    }
  })
  airport.city=city
  airport.country = country
  console.log(`airport ${airport.name} has bee added`)
  airports.push(airport) 
}
// Save to database
    await AirportRepository.insert(airports);
}

export async function importCitiesFromExcel(data: unknown[]) {
    const cityRepository = AppDataSource.getRepository(City);
    const cities:City[]= []
    // Skip the header row
    data.shift();
  
    for (const row of data) {
      // Clean and map data
      const city = new City();
      city.id = row[0];
      city.name = row[1].trim();
      city.alt_name = row[2] === "NULL"?null:row[2]; // Nullable
      city.is_active= row[4];
      city.created_at = ExcelDateToJSDate(row[5]);
      city.updated_at = ExcelDateToJSDate(row[6]);
      city.lat = row[7];
      city.long = row[8];
     const country=await AppDataSource.getRepository(Country).findOne({
      where:{
        id:row[3]
      }
    })
    city.country = country
    console.log(`cuty ${city.name} has bee added`)
    cities.push(city) 
  }
  // Save to database
      await cityRepository.insert(cities);
  }



