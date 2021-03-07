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
import umbrellaIcon from '../../assets/umbrella.png'

import { LocationContext } from '../../contexts/LocationContext'
import { kToC } from '../../utils/convertTemp'
import { CardContainer, Cloud, Divider, Weather, Days, ScrollDays } from './styles'

export const Card: FC = () => {
    const { position, loadingLocation, loadingForescast, erroLocation, locationRequest } = useContext(LocationContext)
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
                        <p>Tempo em {`${position?.address?.city || ''} - ${position?.address?.country || ''}`}</p>
                        <span id="address">
                            {`${position?.approximateMeters} metros de precisão. ${position?.address?.street}, ${position?.address?.number}.`}
                        </span>
                    </>
                )}

                {position?.weatherCurrent?.rain ? (<img src={cloudIcon} />) : (<img style={{ width: 'none', height: 60 }} src={noCloudIcon} />)}
                <div>
                    <span id="week">{format(currentDate, 'iiii', {
                        locale: ptBR
                    })},</span>
                    <span id="day">{format(currentDate, 'dd LLL', {
                        locale: ptBR
                    }).toUpperCase()}</span>
                </div>
                <span id="cloud"> {position?.weatherCurrent?.weather[0].description}
                </span>
                <button disabled={loadingLocation || loadingForescast} onClick={locationRequest}> Atualizar informações
                </button>
            </Cloud>

            <Divider />

            <Weather>
                <div>HUMIDADE
                    <img src={ellipseIcon} />
                    {position?.weatherCurrent?.humidity}%
                </div>

                <div>TEMPERATURA
                    <img src={sunIcon} />
                    {kToC(position?.weatherCurrent?.temp || 0)}ºC
                </div>

                <div>VENTO
                    <img src={vectorIcon} />
                    {position?.weatherCurrent?.wind_speed} km/h
                </div>

            </Weather>

            <Divider />

            <ScrollDays>
                {loadingForescast && (
                    <ReactLoading className="maginAutoLoading" type="bars" height={70} width={70} />
                )}
                {position?.forecasts?.map((forecast) => (
                    <Days key={forecast.dt_txt}>
                        <div style={{ minWidth: 80 }}>
                            <span id="titleDay">
                                {format(new Date(forecast.dt_txt), 'dd/MM')}
                            </span>
                            <span>
                                {format(new Date(forecast.dt_txt), 'EEEE', {
                                    locale: ptBR
                                })}
                            </span>
                        </div>

                        <div>
                            <span>
                                {!forecast.rain ? (<img style={{ height: 26 }} src={noCloudIcon} />) : (<img src={cloudIcon} />)}
                            </span>
                            <span style={{ textAlign: 'center' }}>
                                <span style={{ color: '#999999' }}> {forecast.weather[0].description}</span>
                            </span>
                        </div>

                        <div>
                            <span>
                                <img src={ellipsesIcon} />
                            </span>
                            <span>
                                {forecast.main.humidity}%
              </span>
                        </div>

                        <div>
                            <span>
                                <img src={vectorIcon} />
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