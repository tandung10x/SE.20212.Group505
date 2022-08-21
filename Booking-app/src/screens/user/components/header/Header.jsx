import React, { useState } from 'react'
import { Bed, CalendarMonth, Person } from '@mui/icons-material'
import { Button } from '@mui/material'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchData } from '../../../../redux/searchSlice'

export default function Header({ type }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });

    const handleClickOptions = (name, type) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: type === "increament" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const handleSubmit = () => {
        const values = {
            destination,
            dates,
            options
        }
        dispatch(setSearchData(values));
        navigate('/homestays', { state: values });
    }

    return (
        <div className='header'>
            <div className={`${type === "search" ? "container header-has-search" : "container"}`}>
                <div className="header-top">
                    <h2><Link to='/'>jade hill homeStays</Link></h2>
                    {/* <div className="header-top__right">
                        <Button variant='contained' size='small' sx={{ marginRight: 1}}>login</Button>
                        <Button color='success' variant='contained' size='small'>register</Button>
                    </div> */}
                </div>
                {type === "search" && <>
                    <div className="header-center">
                        <h3>best quantity - best price</h3>
                        <p>We give you a lovely welcome, everytime you come back</p>
                    </div>
                    <div className="header-search">
                        <div className="header-search__item">
                            <Bed color='disabled' sx={{ zIndex: 10 }} />
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                className="header-search__input"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                        <div className="header-search__item">
                            <CalendarMonth color='disabled' sx={{ zIndex: 10 }} />
                            <span
                                onClick={() => setOpenDate(!openDate)}
                                className="header-search__text"
                            >
                                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                            </span>
                            {openDate && (
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className="date"
                                    minDate={new Date()}
                                />
                            )}
                        </div>
                        <div className="header-search__item">
                            <Person color='disabled' sx={{ zIndex: 10 }} />
                            <span
                                onClick={() => setOpenOptions(!openOptions)}
                                className="header-search__text"
                            >
                                {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                            </span>
                            {openOptions && (
                                <div className="options">
                                    <div className="options-item">
                                        <span className="options-item__text">Adult</span>
                                        <div className="options-item__counter">
                                            <button
                                                disabled={options.adult <= 1}
                                                className="options-item__counterButton"
                                                onClick={() => handleClickOptions("adult", "decrement")}
                                            >
                                                -
                                            </button>
                                            <span className="options-item__counterNumber">{options.adult}</span>
                                            <button
                                                className="options-item__counterButton"
                                                onClick={() => handleClickOptions("adult", "increament")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="options-item">
                                        <span className="options-item__text">Children</span>
                                        <div className="options-item__counter">
                                            <button
                                                disabled={options.children <= 0}
                                                className="options-item__counterButton"
                                                onClick={() => handleClickOptions("children", "decrement")}
                                            >
                                                -
                                            </button>
                                            <span className="options-item__counterNumber">{options.children}</span>
                                            <button
                                                className="options-item__counterButton"
                                                onClick={() => handleClickOptions("children", "increament")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="options-item">
                                        <span className="options-item__text">Room</span>
                                        <div className="options-item__counter">
                                            <button
                                                disabled={options.room <= 1}
                                                className="options-item__counterButton"
                                                onClick={() => handleClickOptions("room", "decrement")}
                                            >
                                                -
                                            </button>
                                            <span className="options-item__counterNumber">{options.room}</span>
                                            <button
                                                className="options-item__counterButton"
                                                onClick={() => handleClickOptions("room", "increament")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="header-search__item search-btn">
                            <Button
                                color='success'
                                variant='contained'
                                size='small'
                                onClick={handleSubmit}
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}
