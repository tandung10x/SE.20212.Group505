import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { format, parseISO } from 'date-fns'

export default function ListCustomer() {
    const { statisticals } = useSelector(state => state.statistical);
    const [listCustomer, setListCustomer] = useState([]);

    useEffect(() => {
        setListCustomer([...statisticals]);
    }, [statisticals])


    return (
        <div className='admin-list'>
            <Sidebar />
            <div className="admin-list__container">
                <Navbar />
                <div className='data-table'>
                    <div className="data-table__title">
                        <span>List Customer</span>
                    </div>
                    <Box sx={{ flex: 6, width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                            <Table aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '150px' }}
                                        >
                                            Customer Name
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '120px' }}
                                        >
                                            Customer email
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '120px' }}
                                        >
                                            Customer Phone
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, cursor: 'pointer', minWidth: '100px' }}
                                        >
                                            Total
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            sx={{ fontWeight: 600, minWidth: '200px' }}
                                        >
                                            Date Created
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listCustomer.map((item, index) => {
                                        return (
                                            <TableRow key={index} >
                                                <TableCell align='left'>
                                                    {item?.id_customer?.fullname}
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {item?.id_customer?.email}
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {item?.id_customer?.phone}
                                                </TableCell>
                                                <TableCell align='left'>${item?.total}</TableCell>
                                                <TableCell align='left'>
                                                    {format(parseISO(item?.createdAt), 'MM-dd-yyyy')}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    <TableRow>
                                        <TableCell rowSpan={4}/>
                                        <TableCell colSpan={2}/>
                                        <TableCell style={{ fontWeight: 600 }} colSpan={2}>
                                            Total revenue: {" "}$
                                            {
                                                listCustomer?.map(item => item?.total)?.reduce((prev, cur) => (prev + cur), 0)
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>
        </div>
    )
}
