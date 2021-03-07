import React, { FC, useContext } from 'react'

import { CardContainer } from './styles'
import { LocationContext } from '../../contexts/LocationContext'

export const Card: FC = () => {
    const { position } = useContext(LocationContext)
    return (<>
        <CardContainer>
            <p>{position?.approximateMeters}</p>
            <p>{position?.address?.street}</p>
            <p>{position?.address?.number}</p>
            <p>{position?.address?.state}</p>
            <p>{position?.address?.postal_code}</p>
            <p>{position?.address?.country}</p>
        </CardContainer>
    </>)
}

export default Card