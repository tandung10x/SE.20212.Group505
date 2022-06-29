import React from 'react'

export function CardItemFirst({ item }) {
    return (
        <div className='card-item'>
            <img src={item.image} alt="" className="card-item__img" />
            <div className="card-item__props">
                <h2>{item.name}</h2>
                <h3>{item.property > 1 ? `${item.property} properties` : `${item.property} property`}</h3>
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