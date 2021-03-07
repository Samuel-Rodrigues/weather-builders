import axios from 'axios'

const api = axios.create({
    baseURL: `${process.env.REACT_APP_URL_MAP_BOX}${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`,
    timeout: 5000,
})

export const fetch = async<T>(
    endpoint: string,
    options: Partial<T> | undefined = undefined) => {
    try {
        const { data } = await api.get(endpoint, { params: options })
        return data
    } catch (error) {
        throw error
    }
}