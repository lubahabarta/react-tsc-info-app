import React, { useState } from 'react'
import './TimeBlock.css'
import moment from 'moment'

const TimeBlock = () => {
    const [ampm, setAmpm] = useState<string>(moment().format('a'));
    const [hours, setHours] = useState<number>((ampm === 'pm') ? (+moment().format('hh') + 12) : (+moment().format('hh')));
    const [minutes, setMinutes] = useState<number>(+moment().format('mm'));

    setInterval(() => {
        setAmpm(moment().format('a'));
        setHours(state => state = (ampm === 'pm') ? (+moment().format('hh') + 12) : (+moment().format('hh')));
        setHours(state => state = (state === 24) ? 0 : state);
        setMinutes(state => state = +moment().format('mm'));
    }, 1000);

    return (
        <div className='block time-block'>
            <h3>
                <span>{(hours < 10) ? (`0${hours}`) : (hours)}</span>
                :
                <span>{(minutes < 10) ? (`0${minutes}`) : (minutes)}</span>
            </h3>
        </div>
    )
}

export default TimeBlock