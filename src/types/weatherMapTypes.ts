export interface ForecastS {
    weather: { main: string, description: string };
    clouds: { all: number }
    wind: { speed: number, deg: number }
    dt_txt: string
    main: { temp_min: number, temp_max: number, humidity: number, }
}