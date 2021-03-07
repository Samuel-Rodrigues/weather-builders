import React, { useState, createContext } from 'react'
import { Coords } from '../types/geolocationTypes'
import Geocode from "react-geocode";

export const LocationContext = createContext<{ position?: Coords }>({});

export const LocationProvider = (props: any) => {

    (async () => {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos: any) {
            var crd = pos.coords;
            setPosition({ lat: crd.latitude, lgn: crd.longitude, approximateMeters: crd.accuracy })
            getAddress(crd.latitude, crd.longitude)
        };

        function error(err: any) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            alert("Sinto muito, mas os serviços de geolocalização não são compatíveis com seu navegador.");
        }
    })()

    const getAddress = (lat: number, lgn: number) => {
        Geocode.setApiKey(String(process.env.REACT_APP_KEY_GOOGLE));
        Geocode.enableDebug();

        Geocode.fromLatLng(String(lat), String(lgn)).then(
            response => {
                const { address_components } = response.results[0];

                setPosition({
                    ...position,
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

    const [position, setPosition] = useState<Coords>()

    return (
        <LocationContext.Provider value={{ position }}>
            { props.children}
        </LocationContext.Provider >
    )
}