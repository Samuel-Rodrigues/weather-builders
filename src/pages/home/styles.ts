import styled from 'styled-components'

export const IndexContainer = styled.div`
`

export const CardContainer = styled.div`
    background: #191919;
    position: absolute;
    width: 500px;
    height: 510px;
    top: 7vw;
    z-index: 999;
    border-radius: 22px;
`

export const Cloud = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    flex-direction: column;

    button {
        margin-top: 5px;
        color: #CCCCCC;
        background: none;
        border-radius: 8px;
        padding: 10px;
    }

    p {
        color: #FFFFFF;
        font-size: 18px;
        margin: 10px;
        font-family: Montserrat;
    }

    img {
        margin: 10px 0 10px;
        width: 80px;
        height: 80px;
    }

    #week {
        margin: 10px 0 10px;
        color: #FFF;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 18px;
    }

    #day {
        margin-left: 3px;
        color: #FFF;
        font-family: Montserrat;
        font-size: 16px;
    }

    #cloud {
        margin-top: 3px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #CCCCCC;
    }

    #address {
        font-size: 14px;
        font-family: Montserrat;
        color: #CCCCCC;
    }

    #error {
        padding: 25px;
        font-size: 18px;
        font-family: Montserrat;
        font-weight: bold;
        color: #CA9C9C;
    }
`

export const Days = styled.div`
    padding: 5px 0 5px;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px solid;

    div {
        margin: 0 30px 0;
        flex-direction: column;
        color: #FFFFFF;
        display: flex;
        align-items: center;

        img {
            margin: 10px 0 10px;
            height: 35px;
        }

        span {
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
        }
    }

    #titleDay {
        font-size: 18px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 32px;
    }
`

export const Divider = styled.hr`
    border: 1px solid #4D4D4D;
`

export const Weather = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;

    div {
        margin: 0 15px 0;
        display: flex;
        flex-direction: column;
        color: #E5E5E5;
        align-items: center;

        img {
            margin: 10px 0 10px;
            height: 35px;
        }
    }
`

export const ScrollDays = styled.div`
    background-color: #2a2a2f;
    overflow: scroll;
    max-height: 170px;
    border-radius: 20px;

    .maginAutoLoading {
        margin: auto;
    }
`

