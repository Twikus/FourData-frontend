export interface Siren {
    siren: number
}

export interface Siret {
    siret: number
}

export interface Company {
    id: number,
    name: string,
    address: string,
    siren: number,
    siret: number,
    tvaNumber: string,
    status: boolean | string,
}