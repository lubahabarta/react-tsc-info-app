import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
// STYLES
import './App.css'
// INTERFACES
import { WeatherModel } from './interfaces/WeatherModel'
import { TemperatureModel } from './interfaces/TemperatureModel'
// COMPONENTS
import TurnNavigationOn from './TurnNavigationOn'
import WeatherBlock from './WeatherBlock'
import TemperatureBlock from './TemperatureBlock'
import TimeBlock from './TimeBlock'

// I'M STUPID
const apikey: string = '9b651d6fb2f4d47e955a60f4e4af189a';

function App() {
    const [lat, setLat] = useState<number | undefined>(undefined);
    const [lon, setLon] = useState<number | undefined>(undefined);

    const [weatherToday, setWeatherToday] = useState<WeatherModel | undefined>(undefined);
    const [tempToday, setTempToday] = useState<TemperatureModel | undefined>(undefined);

    const [isPending, setIsPending] = useState<boolean>(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
    }, []);

    useEffect(() => {
        lat && lon && (async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`);
            const json = await response.json();

            setWeatherToday({
                weather: json.weather[0].main,
                description: json.weather[0].description,
                icon: json.weather[0].icon
            });

            setTempToday({
                temp: json.main.temp,
                feelsLike: json.main.feels_like
            });

            setIsPending(true);

        })();
    }, [lat, lon])

    return (
        <div className={`app ${!(lat && lon) && 'is-pending'}`}>

            {!(lat && lon) && <TurnNavigationOn />}

            <CSSTransition in={isPending} timeout={500} classNames="block">
                <div>
                    {weatherToday && <WeatherBlock weatherToday={weatherToday} />}
                </div>
            </CSSTransition>
            <CSSTransition in={isPending} timeout={500} classNames="block">
                <div>
                    {tempToday && <TemperatureBlock tempToday={tempToday} />}
                </div>
            </CSSTransition>
            <CSSTransition in={isPending} timeout={500} classNames="block">
                <div>
                    {weatherToday && <TimeBlock />}
                </div>
            </CSSTransition>
        </div>
    );
}

export default App