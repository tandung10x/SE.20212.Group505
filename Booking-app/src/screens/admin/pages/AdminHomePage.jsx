import React, { useEffect } from 'react'
import Chart from '../components/charts/Chart'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import TotalRevenue from '../components/total-revenue/TotalRevenue'
import TransactionTable from '../components/transaction-table/TransactionTable'
import WidgetItem from '../components/widget/WidgetItem'
import { useDispatch } from 'react-redux'
import { getAllDestination } from '../../../redux/destinationSlice'
import { getAllRoom } from '../../../redux/roomSlice'
import { getAllManager } from '../../../redux/userSlice'
import { getAllService } from '../../../redux/serviceSlice'
import { getAllStatistical } from '../../../redux/statisticalSlice'

function AdminHomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDestination());
    dispatch(getAllRoom());
    dispatch(getAllManager());
    dispatch(getAllService());
    dispatch(getAllStatistical());
  }, [dispatch])

  return (
    <div className='admin'>
      <Sidebar />
      <div className="admin-container">
        <Navbar />
        <div className="list-widget">
          <WidgetItem type='user' />
          <WidgetItem type='order' />
          <WidgetItem type='homestay' />
          <WidgetItem type='total' />
        </div>
        <div className="charts">
          <TotalRevenue />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="transaction">
          <div className="transaction-title">Latest Transactions</div>
          <TransactionTable />
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage;