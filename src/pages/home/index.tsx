import React, { FC } from 'react'

import GenericMap from '../../components/genericMap'


import Card from './Card'
import { IndexContainer } from './styles'

export const Home: FC = () => {

    return (<>
        <IndexContainer>
            <Card />
            <GenericMap />
        </IndexContainer>
    </>)
}

export default Home