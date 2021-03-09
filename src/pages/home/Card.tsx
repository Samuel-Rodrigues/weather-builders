import React, { FC, useContext } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import ReactLoading from 'react-loading'

import sunIcon from '../../assets/sun.png'
import cloudIcon from '../../assets/cloud.png'
import vectorIcon from '../../assets/vector.png'
import noCloudIcon from '../../assets/noCloud.png'
import ellipseIcon from '../../assets/ellipse.png'
import ellipsesIcon from '../../assets/ellipses.png'

import {
    Cloud,
    Divider,
    Weather,
    Days,
    ScrollDays,
    CardContainer,
} from './styles'
import { kToC } from '../../utils/convertTemp'
import { LocationContext } from '../../contexts/LocationContext'


export const Card: FC = () => {

    const {
        locationData,
        loadingLocation,
        loadingForescast,
        erroLocation,
        locationRequest
    } = useContext(LocationContext)

    const currentDate = new Date()

    return (<>
        <CardContainer>
            <Cloud>
                {loadingLocation === true && (<ReactLoading type="bars" height={70} width={70} />)}

                {erroLocation || loadingLocation ? (<>
                    <span id="error">
                        {erroLocation}
                    </span>
                </>) : (
                    <>
                        <p>Tempo em {`${locationData?.address?.city || ''} - ${locationData?.address?.country || ''}`}</p>
                        <span id="address">
                            {`${locationData?.approximateMeters} metros de precisão. ${locationData?.address?.street}, ${locationData?.address?.number}.`}
                        </span>
                    </>
                )}

                {locationData?.weatherCurrent?.rain ? (
                    <img src={cloudIcon} alt="icon cloud" />
                ) : (
                    <img style={{ width: 'none', height: 60 }} src={noCloudIcon} alt="icon noCloud" />
                )}

                <div>
                    <span id="week">{format(currentDate, 'iiii', {
                        locale: ptBR
                    })},</span>
                    <span id="day">{format(currentDate, 'dd LLL', {
                        locale: ptBR
                    }).toUpperCase()}</span>
                </div>

                <span id="cloud"> {locationData?.weatherCurrent?.weather[0].description}
                </span>
                <button
                    onClick={locationRequest}> Atualizar informações
                </button>

            </Cloud>

            <Divider />

            <Weather>
                <div>HUMIDADE
                    <img src={ellipseIcon} alt="ellipseIcon" />
                    {locationData?.weatherCurrent?.humidity}%
                </div>

                <div>TEMPERATURA
                    <img src={sunIcon} alt="sunIcon" />
                    {kToC(locationData?.weatherCurrent?.temp || 0)}ºC
                </div>

                <div>VENTO
                    <img src={vectorIcon} alt="vectorIcon" />
                    {locationData?.weatherCurrent?.wind_speed} km/h
                </div>
            </Weather>

            <Divider />

            <ScrollDays>
                {loadingForescast && (
                    <ReactLoading className="maginAutoLoading" type="bars" height={70} width={70} />
                )}

                {locationData?.forecasts?.map((forecast) => (
                    <Days key={forecast.dt_txt}>
                        <div style={{ minWidth: 80 }}>

                            <span id="titleDay">
                                {format(new Date(forecast.dt_txt), `hh'h' '-' dd/MM`)}
                            </span>
                            <span>
                                {format(new Date(forecast.dt_txt), 'EEEE', {
                                    locale: ptBR
                                })}
                            </span>
                        </div>

                        <div style={{minWidth: 90}}>
                            <span >
                                {!forecast.rain ? (<img style={{ height: 26 }} src={noCloudIcon} alt="noCloudIcon" />) : (<img src={cloudIcon} alt="cloudIcon" />)}
                            </span>
                            <span style={{ textAlign: 'center' }}>
                                <span style={{ color: '#999999' }}> {forecast.weather[0].description}</span>
                            </span>
                        </div>

                        <div>
                            <span>
                                <img src={ellipsesIcon} alt="ellipsesIcon" />
                            </span>
                            <span>
                                {forecast.main.humidity}%
                         </span>
                        </div>

                        <div>
                            <span>
                                <img src={vectorIcon} alt="vectorIcon" />
                            </span>
                            <span>
                                {forecast.wind.speed} Km/h
                        </span>

                        </div>
                    </Days>
                ))}
            </ScrollDays>
        </CardContainer>
    </>)
}

export default Card