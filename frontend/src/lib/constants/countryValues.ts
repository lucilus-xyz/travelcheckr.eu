import type { ICountry, TCountries, TCountry } from "$lib/interfaces/IAllowedValues/interfaceCountries";

const createCountryObject = (code:TCountry, name:string):ICountry => {
    return {
        code: code,
        name: name,
    }
}

export const countriesValues:TCountries = [
    createCountryObject('germany','Germany'),
    createCountryObject('belgium','Belgium'),
]

