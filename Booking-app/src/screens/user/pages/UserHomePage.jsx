import React, { useEffect } from 'react'
import { featureCard, featureGuestLove, featurePropertyType } from '../../../assets/fake-data/dummyData'
import { getAllRoom } from '../../../redux/roomSlice'
import { getAllService } from '../../../redux/serviceSlice'
import { CardItemFirst, CardItemGuestLove, CardItemPropertyType } from '../components/card-item/CardItem'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useDispatch } from 'react-redux'

export default function UserHomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllService());
        dispatch(getAllRoom());
    }, [dispatch])

    return (
        <div className='user'>
            <Header type="search" />
            <div className="user-container container">
                {/* 1 */}
                <div className='row'>
                    {featureCard.map((item, index) => {
                        return (
                            <div className='col-4 col-md-6 col-sm-12' key={index}>
                                <CardItemFirst item={item} />
                            </div>
                        )
                    })}
                </div>
                <h1 className="user-home__title">Browse by property type</h1>
                <div className="card-list-property">
                    {featurePropertyType.map((item, index) => {
                        return (
                            <CardItemPropertyType key={index} item={item}/>
                        )
                    })}
                </div>
                <h1 className="user-home__title">Homes guests love</h1>
                <div className="row card-list-guest">
                    {featureGuestLove.map((item, index) => {
                        return (
                            <div className="col-3 col-md-4 col-sm-12" key={index}>
                                <CardItemGuestLove item={item}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}
