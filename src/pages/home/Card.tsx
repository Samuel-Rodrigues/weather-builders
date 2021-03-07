import React, { FC, useContext } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import cloudIcon from '../../assets/cloud.png'
import vectorIcon from '../../assets/vector.png'
import ellipseIcon from '../../assets/ellipse.png'
import umbrellaIcon from '../../assets/umbrella.png'

import { kToC } from '../../utils/convertTemp'
import { LocationContext } from '../../contexts/LocationContext'
import { CardContainer, Cloud, Divider, Weather, Days, ScrollDays } from './styles'

export const Card: FC = () => {
    const { position } = useContext(LocationContext)
    const currentDate = new Date()

    return (<>
        <CardContainer>
            <Cloud>
                <p>O tempo em {`${position?.address?.city} - ${position?.address?.country}`}</p>
                <span id="address">
                    {`${position?.approximateMeters} metros de precisão. ${position?.address?.street}, ${position?.address?.number}.`}
                </span>
                <img src={cloudIcon} />
                <div>
                    <span id="week">{format(currentDate, 'iiii', {
                        locale: ptBR
                    })},</span>
                    <span id="day">{format(currentDate, 'dd LLL', {
                        locale: ptBR
                    }).toUpperCase()}</span>
                </div>
                <span id="cloud">Humidade - {position?.weatherCurrent?.humidity}%</span>
            </Cloud>

            <Divider />

            <Weather>
                <div>HUMIDADE
                    <img src={ellipseIcon} />
                    {position?.weatherCurrent?.humidity}%
                </div>

                <div>CHUVA
                    <img src={umbrellaIcon} />
                    40%
                </div>

                <div>VENTO
                    <img src={vectorIcon} />
                    {position?.weatherCurrent?.wind_speed} km/h
                </div>

            </Weather>

            <Divider />

            <ScrollDays>

                {position?.forecasts?.map((forecast) => (
                    <Days key={forecast.dt_txt}>
                        <div>
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
                                <img src={cloudIcon} />
                            </span>
                            <span>
                                <span style={{ color: '#999999' }}>{kToC(forecast?.main.temp_min)} °</span>{kToC(forecast?.main.temp_min)}°
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

                {/* <Days>
                    <div>
                        <span id="titleDay">
                            {format(new Date(), 'dd/MM')}
                        </span>
                        <span>
                            {format(new Date(), 'EEEE', {
                                locale: ptBR
                            })}
                        </span>
                    </div>

                    <div>
                        <span>
                            <img src={cloudIcon} />
                        </span>
                        <span>
                            95%
                    </span>
                    </div>

                    <div>
                        <span>
                            <img src={vectorIcon} />
                        </span>
                        <span>
                            10mk/h
                    </span>
                    </div>
                </Days>

                <Days>
                    <div>
                        <span id="titleDay">
                            {format(new Date(), 'dd/MM')}
                        </span>
                        <span>
                            {format(new Date(), 'EEEE', {
                                locale: ptBR
                            })}
                        </span>
                    </div>

                    <div>
                        <span>
                            <img src={cloudIcon} />
                        </span>
                        <span>
                            95%
                    </span>
                    </div>

                    <div>
                        <span>
                            <img src={vectorIcon} />
                        </span>
                        <span>
                            10mk/h
                    </span>
                    </div>
                </Days>

                <Days>
                    <div>
                        <span id="titleDay">
                            {format(new Date(), 'dd/MM')}
                        </span>
                        <span>
                            {format(new Date(), 'EEEE', {
                                locale: ptBR
                            })}
                        </span>
                    </div>

                    <div>
                        <span>
                            <img src={cloudIcon} />
                        </span>
                        <span>
                            95%
                    </span>
                    </div>

                    <div>
                        <span>
                            <img src={vectorIcon} />
                        </span>
                        <span>
                            10mk/h
                    </span>
                    </div>
                </Days> */}

            </ScrollDays>
        </CardContainer>
    </>)
}

export default Card