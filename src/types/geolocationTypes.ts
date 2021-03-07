export interface Coords {
    lat?: number
    lgn?: number
    approximateMeters?: number
    address?: Address
    weatherCurrent?: WeatherCurrent
    forecasts?: Array<Forecast>
}

interface Address {
    street: string
    city: string
    state: string
    number: string
    country: string
    postal_code: string
}

export interface WeatherCurrent {
    humidity: number
    temp: number
    wind_speed: number
    alerts?: Array<Alert>
    weather: Array<Weather>
    rain: Rain
}

export interface Rain {
    '1h'?: number
    '3h'?: number
}

export interface Weather {
    description: string
    main: string
}

export interface Alert {
    description: string
    event: string
}

export interface Forecast {
    main: { temp_min: number, temp_max: number, humidity: number }
    weather: [{ main: string, description: string }];
    clouds: { all: number }
    wind: { speed: number, deg: number }
    dt_txt: string
    rain: Rain
}