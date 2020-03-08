import { Coord, Main, Wind, Clouds, Weather } from '.';

export interface CityWeather {
    id: number;
    name: string;
    coord: Coord;
    main: Main;
    dt: number;
    wind: Wind;
    clouds: Clouds;
    weather: Weather[];
  }