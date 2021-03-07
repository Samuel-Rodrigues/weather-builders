import React, { FC } from 'react'

import Card from './Card'
import { IndexContainer } from './styles'
import GenericMap from '../../components/genericMap'

export const Home: FC = () => {

    return (<>
        <IndexContainer>
            <Card />
            <GenericMap />
        </IndexContainer>
    </>)
}

export default Home