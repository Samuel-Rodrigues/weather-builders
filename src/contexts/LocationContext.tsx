import React, { useState, createContext, useEffect } from 'react'
import Geocode from "react-geocode";
import { LocationData, Forecast } from '../types/geolocationTypes'

import { fetchOnecall, fetchForecast } from '../services/weatherMapApi'

export const LocationContext = createContext<{
    locationData?: LocationData
    loadingLocation?: boolean
    loadingForescast?: boolean
    erroLocation?: string
    locationRequest?: () => void
}>({});

export const LocationProvider = (props: any) => {

    const [locationData, setLocationData] = useState<LocationData>()
    const [loadingForescast, setLoadingForescast] = useState<boolean>(false)
    const [loadingLocation, setLoadingLocation] = useState<boolean>(true)
    const [erroLocation, setErroLocation] = useState<string>('')

    useEffect(() => {
        locationRequest()
    }, [])

    useEffect(() => {
        if (locationData?.lat && !locationData?.weatherCurrent) {
            requestWeather()
        }
    }, [locationData])

    function locationRequest() {
        setLoadingLocation(true)
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos: any) {
            var crd = pos.coords;
            setLoadingLocation(false)
            setErroLocation('')
            getAddress(crd.latitude, crd.longitude, crd.accuracy)
        };

        function error(err: any) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
            setErroLocation('Erro ao obter sua localização')
            setLoadingLocation(false)
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            setErroLocation('Este navegador não tem suporte a localização')
            setLoadingLocation(false)
        }

    }

    const getAddress = (lat: number, lgn: number, accuracy: number) => {
        setLoadingForescast(true)
        Geocode.setApiKey(String(process.env.REACT_APP_KEY_GOOGLE));
        Geocode.enableDebug();

        Geocode.fromLatLng(String(lat), String(lgn)).then(
            response => {
                const { address_components } = response.results[0];
                setLocationData({
                    lat: lat,
                    lgn: lgn,
                    approximateMeters: accuracy,
                    address: {
                        number: address_components[0].long_name || '',
                        street: address_components[1].long_name || '',
                        city: address_components[3].long_name || '',
                        state: address_components[4].long_name || '',
                        country: address_components[5].long_name || '',
                        postal_code: address_components[6].long_name || ''
                    }
                })
            },
            error => {
                console.error(error);
            }
        );
    }

    const requestWeather = async () => {
        setLoadingForescast(true)
        if (locationData?.lat && locationData.lgn) {
            const { lat, lgn, address } = locationData
            const { alerts, current, rain } = await fetchOnecall(lat, lgn)

            let forecasts: Array<Forecast> = []

            if (address) {
                forecasts = await fetchForecast(address?.city, address?.postal_code)
            }

            setLocationData({
                ...locationData,
                weatherCurrent: {
                    ...current,
                    alerts: alerts,
                    rain: rain
                },
                forecasts: forecasts
            })

            setLoadingForescast(false)
        }
    }

    return (
        <LocationContext.Provider value={{ locationData, loadingForescast, loadingLocation, erroLocation, locationRequest }}>
            { props.children}
        </LocationContext.Provider >
    )
}