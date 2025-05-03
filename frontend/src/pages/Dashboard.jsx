import {use, useEffect, useState} from 'react'
import { fetchBuyerList, fetchOrders } from '../api/apiStore'
import { Link } from 'react-router-dom'


const Dashboard = () => {

    const [orders, setOrders] = useState([])
    const [buyers, setBuyers] = useState([])

    useEffect(() => {
        fetchOrders()
        .then(setOrders)
        .catch((err) => console.error("Failed to load products", err));
    }, []);

    useEffect(() => {
        fetchBuyerList()
        .then(setBuyers)
        .catch((err) => console.error("Failed to load products", err));
    }, []);





  return (
    <div className='container '>
        <div className='row mt-5'>
            <div className='col-12'>
                <h1 className='text-center'>Dashboard</h1>
            </div>

        </div>
        <div className="table-responsive-xl mb-6 mb-lg-0">
    <div className="flex-nowrap pb-3 pb-lg-0 row">
        <div className="mb-6 col-lg-4 col-12">
            <div className="h-100 card-lg card shadow">
                <div className="p-6 card-body">
                    <div className="d-flex justify-content-between align-items-center mb-6">
                        <div>
                            <h4 className="mb-0 fs-5">Earnings</h4>
                        </div>
                        <div className="icon-shape icon-md bg-light-danger text-dark-danger rounded-circle">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24">
                                <path d="M12.9494914,6 C13.4853936,6.52514205 13.8531598,7.2212202 13.9645556,8 L17.5,8 C17.7761424,8 18,8.22385763 18,8.5 C18,8.77614237 17.7761424,9 17.5,9 L13.9645556,9 C13.7219407,10.6961471 12.263236,12 10.5,12 L7.70710678,12 L13.8535534,18.1464466 C14.0488155,18.3417088 14.0488155,18.6582912 13.8535534,18.8535534 C13.6582912,19.0488155 13.3417088,19.0488155 13.1464466,18.8535534 L6.14644661,11.8535534 C5.83146418,11.538571 6.05454757,11 6.5,11 L10.5,11 C11.709479,11 12.7183558,10.1411202 12.9499909,9 L6.5,9 C6.22385763,9 6,8.77614237 6,8.5 C6,8.22385763 6.22385763,8 6.5,8 L12.9499909,8 C12.7183558,6.85887984 11.709479,6 10.5,6 L6.5,6 C6.22385763,6 6,5.77614237 6,5.5 C6,5.22385763 6.22385763,5 6.5,5 L10.5,5 L17.5,5 C17.7761424,5 18,5.22385763 18,5.5 C18,5.77614237 17.7761424,6 17.5,6 L12.9494914,6 L12.9494914,6 Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="lh-1">
                        <h1 className="mb-2 fw-bold fs-2">
                        {orders && orders.length
                        ? (orders.reduce((acc, order) => acc + parseFloat(order.total_price), 0)).toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            minimumFractionDigits: 2,
                            })
                        : '₹0.00'}
                            </h1><span>Monthly revenue</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="mb-6 col-lg-4 col-12">
            <div className="h-100 card-lg card shadow">
                <div className="p-6 card-body">
                    <div className="d-flex justify-content-between align-items-center mb-6">
                        <div>
                            <h4 className="mb-0 fs-5">Orders</h4>
                        </div>
                        <div className="icon-shape icon-md bg-light-warning text-dark-warning rounded-circle"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em"
                                fill="currentColor" className="bi bi-cart fs-5">
                                <path
                                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2">
                                </path>
                            </svg></div>
                    </div>
                    <div className="lh-1">
                        <h1 className="mb-2 fw-bold fs-2">
                            {orders && orders.length ?orders.length : 0}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="mb-6 col-lg-4 col-12">
            <div className="h-100 card-lg card shadow">
                <div className="p-6 card-body">
                    <div className="d-flex justify-content-between align-items-center mb-6">
                        <div>
                            <h4 className="mb-0 fs-5">Customer</h4>
                        </div>
                        <div className="icon-shape icon-md bg-light-info text-dark-info rounded-circle"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em"
                                fill="currentColor" className="bi bi-people fs-5">
                                <path
                                    d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4">
                                </path>
                            </svg></div>
                    </div>
                    <div className="lh-1">
                        <h1 className="mb-2 fw-bold fs-2">{buyers && buyers.length ?buyers.length : 0}</h1> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div className="row mt-5">
    <div className="mb-6 col-xl-12 col-lg-12 col-md-12 col-12">
        <div className="h-100 card-lg card shadow">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="mb-0 fs-5">Recent Order</h3>
            </div>
            <div className="p-0 card-body">
                <div className="table-responsive">
                    <table className="table-centered text-nowrap  table table-borderless table-hover">
                        <thead className="bg-light">
                            <tr>
                                {/* <th scope="col">Order Number</th> */}
                                <th scope='col'>S.N</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Price</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders && orders.length ?
                            orders.map((order, index) => (
                                
                            <tr key={order.id}>
                                {/* <td>{`#${order.id}`}</td> */}
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/order/buyer/${order.buyer.id}`} className="text-dark fw-bold">
                                    {order.buyer.first_name} {order.buyer.last_name} ({order.buyer.phone})
                                    </Link>
                                </td>
                                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                <td>{parseFloat(order.total_price).toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR',
                                    minimumFractionDigits: 2,
                                    })}</td>
                                <td>
                                    
                                
                                    <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                        <Link to={`order/${order.id}`} className='btn btn-dark btn-sm'><i className="fa-solid fa-bars"></i></Link>
                                        {/* <button type="button" className="btn btn-outline-primary">Middle</button> */}
                                        <Link to={`/print/receipt/${order.id}`} className="btn btn-dark btn-sm">
                                        <i className="fa-solid fa-print"></i>
                                        </Link>
                                    </div>
                                </td>
                             
                            </tr>)): <tr><td colSpan="5" className="text-center">No orders found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
                            
    </div>
  )
}

export default Dashboard