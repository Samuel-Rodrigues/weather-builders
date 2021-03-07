export interface Coords {
    lat?: number
    lgn?: number
    approximateMeters?: number
    address?: Address
}

interface Address {
    street: string
    city: string
    state: string
    number: string
    country: string
    postal_code: string
}