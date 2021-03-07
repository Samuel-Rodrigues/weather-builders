import React, { FC, useContext } from 'react'

import GenericMap from '../../components/genericMap'
import { LocationContext } from '../../contexts/LocationContext'

import Card from './Card'
import { IndexContainer } from './styles'

export const Home: FC = () => {
    //fetch('')

    const { position } = useContext(LocationContext)

    return (<IndexContainer>
        <Card />
        <GenericMap position={position} />
    </IndexContainer>)
}

export default Home