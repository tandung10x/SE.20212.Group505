import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchItem({ item }) {
    return (
        <div className='search-item'>
            <img src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg" alt="search-img"/>
            <div className='search-item__desc'>
                <h1 className='desc-name'>{item?.type_of_room}</h1>
                <span className="desc-distance">300m from center</span>
                <span className="desc-taxi">Free airport taxi</span>
                <span className="desc-subtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="desc-feature">Entire studio, 1 bathroom 21m<sup>2</sup> full bed</span>
                <span className="desc-cancel">Free cancellation</span>
                <span className="desc-cancel-subtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="search-item__detail">
                <div className="detail-rating">
                    <span>Excellent</span>
                    <button>7.4</button>
                </div>
                <div className="detail-text">
                    <span className="detail-text__price">${item?.cost_per_day}</span>
                    <span className="detail-text__tax">Includes taxes and fees</span>
                    <Link to={`/homestays/${item._id}`}>
                        <button className="detail-text__btn">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
