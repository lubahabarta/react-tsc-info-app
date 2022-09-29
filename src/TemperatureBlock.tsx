import React from 'react'
import { TemperatureModel } from './interfaces/TemperatureModel'
import './TemperatureBlock.css'

interface Props {
    tempToday: TemperatureModel
}

const TemperatureBlock = ({ tempToday }: Props) => {
    return (
        <div className='block temperature-block'>
            <h3>{Math.round(tempToday.temp)} °C</h3>
            <p>feels like{Math.round(tempToday.feelsLike)} °C</p>
        </div>
    )
}

export default TemperatureBlock