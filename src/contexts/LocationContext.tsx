import React, { useState, createContext, useEffect } from 'react'
import Geocode from "react-geocode";
import { Coords, Forecast } from '../types/geolocationTypes'

import { fetchOnecall, fetchForecast } from '../services/weatherMapApi'

export const LocationContext = createContext<{ position?: Coords }>({});

export const LocationProvider = (props: any) => {

    const [position, setPosition] = useState<Coords>()

    useEffect(() => {
        locationRequest()
    }, [])

    useEffect(() => {
        requestWeather()
    }, [position])

    function locationRequest() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos: any) {
            var crd = pos.coords;
            getAddress(crd.latitude, crd.longitude, crd.accuracy)
        };

        function error(err: any) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            alert("Sinto muito, mas os serviços de geolocalização não são compatíveis com seu navegador.");
        }
    }

    const getAddress = (lat: number, lgn: number, accuracy: number) => {
        Geocode.setApiKey(String(process.env.REACT_APP_KEY_GOOGLE));
        Geocode.enableDebug();

        Geocode.fromLatLng(String(lat), String(lgn)).then(
            response => {
                const { address_components } = response.results[0];
                setPosition({
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
        if (position?.lat && position.lgn) {
            const { lat, lgn, address } = position
            const { alerts, current } = await fetchOnecall(lat, lgn)

            let forecasts: Array<Forecast> = []
            
            if (address) {
                forecasts = await fetchForecast(address?.city, address?.postal_code)
            }

            setPosition({
                ...position,
                weatherCurrent: {
                    ...current,
                    alerts: alerts
                },
                forecasts: forecasts
            })


            // fetchOnecall(lat, lgn).then((res) => {
            //     setPosition({
            //         ...position,
            //         weatherCurrent: {
            //             ...res.current,
            //             alerts: res.alerts
            //         }
            //     })
            // })
        }
    }

    const requestForecast = () => {

    }

    return (
        <LocationContext.Provider value={{ position }}>
            { props.children}
        </LocationContext.Provider >
    )
}