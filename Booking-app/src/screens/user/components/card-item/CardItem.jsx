import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function CardItemFirst({ item, img }) {
    const navigate = useNavigate();
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });

    const handleSearch = async () => {
        navigate('/homestays',
            {
                state: {
                    destination: item?.name_location,
                    dates: dates,
                    options: options
                }
            });
    }

    return (
        <div className='card-item' onClick={handleSearch} >
            <img src={img} alt="error" className="card-item__img" />
            <div className="card-item__props">
                <h2>{item?.name_location}</h2>
                <h3>20 properties</h3>
            </div>
        </div>
    )
}

export function CardItemPropertyType({ item }) {
    return (
        <div className="card-item-property">
            <img
                src={item.image}
                alt="img-property"
            />
            <div className="card-item-property__title">
                <h1>{item.name}</h1>
                <h2>{item.count} {item.type}</h2>
            </div>
        </div>
    )
}

export function CardItemGuestLove({ item }) {
    return (
        <div className="card-item-guest">
            <img
                src={item.photos[0]}
                alt=""
            />
            <p className="card-item-guest__name">{item.name}</p>
            <p className="card-item-guest__city">{item.city}</p>
            <p className="card-item-guest__price">Starting from ${item.cheapestPrice}</p>
            {item.rating && <div className="card-item-guest__rating">
                <button>{item.rating}</button>
                <span>Excellent</span>
            </div>}
        </div>
    )
}