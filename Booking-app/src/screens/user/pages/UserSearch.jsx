import { Button, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react'
import { DateRange } from 'react-date-range';
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import SearchItem from '../components/search-item/SearchItem';
import { useLocation } from 'react-router-dom'
import roomApi from '../../../api/roomApi';
import { Box } from '@mui/system';

export default function UserSearch() {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state?.destination);
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState(location.state?.dates);
    const [options, setOptions] = useState(location.state?.options);
    const [min, setMin] = useState(10);
    const [max, setMax] = useState(999);
    const [listSearchData, setListSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = useCallback(async () => {
        setIsLoading(true);
        const response = await roomApi.searchByDestination(destination);
        setIsLoading(false);
        setListSearchData(response);
    }, [destination])

    useEffect(() => {
        handleSearch();
    }, [handleSearch])

    const handleOptions = (e) => {
        setOptions({
            ...options,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        handleSearch();
    }

    return (
        <div className='user-search'>
            <Header />
            <div className="container">
                <div className="row" style={{ margin: "20px 0 30px 0" }}>
                    {/* search bar */}
                    <div className="col-4 col-md-6 col-sm-12">
                        <div className="list-search">
                            <h1 className="list-search__title">Search</h1>
                            <div className="list-search__item">
                                <label>Destination</label>
                                <input
                                    placeholder={destination}
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="list-search__item">
                                <label>Check-in Date</label>
                                <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                                {openDate && (
                                    <DateRange
                                        onChange={(item) => setDates([item.selection])}
                                        minDate={new Date()}
                                        ranges={dates}
                                        className="date-range"
                                    />
                                )}
                            </div>
                            <div className="list-search__item">
                                <label>Options</label>
                                <div className="list-search__options">
                                    <div className="list-search__options-item">
                                        <span>
                                            Min price <small>per night</small>
                                        </span>
                                        <input
                                            type="number"
                                            value={min}
                                            onChange={(e) => setMin(e.target.value)}
                                            className="list-search__options-inp"
                                        />
                                    </div>
                                    <div className="list-search__options-item">
                                        <span>
                                            Max price <small>per night</small>
                                        </span>
                                        <input
                                            type="number"
                                            value={max}
                                            onChange={(e) => setMax(e.target.value)}
                                            className="list-search__options-inp"
                                        />
                                    </div>
                                    <div className="list-search__options-item">
                                        <span>Adult</span>
                                        <input
                                            type="number"
                                            min={1}
                                            className="list-search__options-inp"
                                            placeholder={options.adult}
                                            value={options.adult}
                                            name='adult'
                                            onChange={(e) => handleOptions(e)}
                                        />
                                    </div>
                                    <div className="list-search__options-item">
                                        <span>Children</span>
                                        <input
                                            type="number"
                                            min={0}
                                            className="list-search__options-inp"
                                            placeholder={options.children}
                                            value={options.children}
                                            name='children'
                                            onChange={(e) => handleOptions(e)}
                                        />
                                    </div>
                                    <div className="list-search__options-item">
                                        <span>Room</span>
                                        <input
                                            type="number"
                                            min={1}
                                            className="list-search__options-inp"
                                            placeholder={options.room}
                                            value={options.room}
                                            name='room'
                                            onChange={(e) => handleOptions(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                sx={{ width: '100%' }}
                                color='success'
                                variant='contained'
                                size='small'
                                onClick={handleSubmit}
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                    {/* list hotel */}
                    <div className="col-8 col-md-12 col-sm-12">
                        {
                            isLoading ? <Box>
                                <CircularProgress color='primary' size={30} />
                            </Box> : <>
                                {
                                    listSearchData?.length > 0 ? listSearchData?.map((item, index) => {
                                        return (
                                            <SearchItem key={index} item={item} />
                                        )
                                    }) : <div>There are no homestay!</div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
