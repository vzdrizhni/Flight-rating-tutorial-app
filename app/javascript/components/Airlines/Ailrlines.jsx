import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Airline from "./Airline";
import './airlines.css'

const Airlines = () => {
    const [airlines, setAirlines] = useState([])

    useEffect(() => {
        axios.get('/api/v1/airlines.json')
        .then(resonse => {
            setAirlines(resonse.data.data)
        })
        .catch(resonse => console.log(resonse))
    }, [airlines.length]);

    const grid = airlines.map(item => {
        return ( <Airline key={item.attributes.name} attributes={item.attributes}></Airline> )
    })

    console.log(grid);

    return(
        <div className='home'>
            <div className='header'>
                <h1>OpenFlights</h1>
                <div className='subheader'>Honest, unbiased airline reviews</div>
            </div>
            <div className='grid'>
                {grid}
            </div>
        </div>
    )
}

export default Airlines