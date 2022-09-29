import React from 'react'
import './WeatherBlock.css'
import { WeatherModel } from './interfaces/WeatherModel'

interface Props {
    weatherToday: WeatherModel
}

const WeatherBlock = ({ weatherToday }: Props) => {
    return (
        <div className='block weather-block'>
            <img src={require(`./images/${weatherToday.icon}.png`)} alt="weather icon" />
            <h3>{weatherToday.weather}</h3>
            <p>{weatherToday.description}</p>
        </div>
    )
}

export default WeatherBlock