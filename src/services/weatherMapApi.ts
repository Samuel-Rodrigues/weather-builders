import axios from 'axios'
import { Alert, WeatherCurrent, Forecast, Rain } from '../types/geolocationTypes'

const api = axios.create({
    baseURL: process.env.REACT_APP_URL_WEATHERMAP,
    timeout: 5000,
})

export const fetch = async<T>(
    endpoint: string,
    options: Partial<T> | undefined = undefined) => {
    try {
        if (options) {
            options = {
                ...options,
                appid: process.env.REACT_APP_KEY_WEATHERMAP,
                lang: 'pt'
            }
        }
        const { data } = await api.get(endpoint, { params: options })
        return data
    } catch (error) {
        throw error
    }
}

export const fetchWeather = async (city: string, stateCode: string) =>
    await fetch('/weather', { q: `${city},${stateCode}` })

export const fetchForecast = async (city: string, stateCode: string) => {
    const { list } = <{ list: Array<Forecast> }>await fetch('/forecast', { q: `${city},${stateCode}` })
    return list
}

export const fetchOnecall = async (lat: number, lon: number) => {
    const { alerts, current, rain } = <{ current: WeatherCurrent, alerts: Array<Alert>, rain: Rain }>await fetch('/onecall', { lat, lon })
    return { alerts, current, rain }
    //eturn response
}
