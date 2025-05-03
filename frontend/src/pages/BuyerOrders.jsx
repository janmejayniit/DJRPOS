import { useState, useEffect, use } from 'react';
import {useParams} from 'react-router-dom'
import {fetchBuyerOrders } from '../api/apiStore'

const BuyerOrders = () => {
     
    const {buyerId} = useParams()
    const [order, setOrder] = useState([]);

   
    useEffect(() => {
            // Fetch order details when the component mounts
            fetchBuyerOrders(buyerId)
            .then(setOrder)
            .catch((err) => console.error("Failed to load orders", err));
    }, []);
   
    useEffect(() => {
        // const total_amount = order.orders.reduce((total, order) => total + parseFloat(order.total_price), 0);
    },[])


  return (
    <div className="container mx-auto mt-5">
    <h2 className="text-2xl font-bold mb-4">Order Details</h2>
    {order.length === 0 ? (
    <p>Order has not items.</p>
    ) : (
    <>
        <div className='row'>
            
            <div className='col-md-6'>
                <div className='card shadow'>
                    <div className='card-header'>
                        <h5 className="font-semibold">Buyer Details</h5>
                    </div>
                    <div className='card-body'>
                        
                        <ul>    
                            <li className="mb-2"><strong>Name:</strong> {order.first_name} {order.last_name}</li>
                            <li className="mb-2"><strong>Phone:</strong> {order.phone}</li>
                            <li className="mb-2"><strong>Email:</strong> {order.email}</li>    
                            <li className="mb-2"><strong>Orders:</strong> {order.orders.length}</li>
                            <li className="mb-2"><strong>Total Amount:</strong> ₹{order.orders.reduce((total, order) => total + parseFloat(order.total_price), 0)}</li>
                        </ul>

                         
                    </div>

                </div>
            </div>

            <div className='col-md-6'>
                <div className="card shadow mb-4">
                    <div className='card-header'>
                    <h5 className="font-semibold">Order Items</h5>
                    </div>
                    <div className="card-body">
                        
                            {order.length===0?<p>No Orders</p>:order.orders.map((order)=>(
                                <table className="table table-striped" >
                            <tbody>
                                    <tr>
                                        <td colSpan="2" className=" font-semibold">
                                            Order Date: {
                                                                new Date(order.created_at).toLocaleString('en-IN', {
                                                                    day: '2-digit',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                    })
                                                                    }
                                        </td>
                                        <td colSpan="2" className="text-center font-semibold">
                                            
                                            {order.payment_method}
                                        </td>
                                    </tr>
                                    {order.items.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index+1}</td>
                                            <td>
                                                {/* <img src={item.image} alt={item.product_details.name} style={{width:'15%'}} className="w-16 h-16 mr-2" /><br/> */}
                                                <span>{item.product_details.name}</span>
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>₹{item.price}</td>
                                        </tr>
                                    ))}
                                    <tr key={order.id}>
                                        <td colSpan="3" className="text-right font-semibold" align='right' >Total:</td>
                                        <td className="font-semibold">₹{order.total_price}</td>
                                    </tr>
                                </tbody>
                        </table>
                            ))}
                            
                            
                         
                    </div>
                </div>
            </div>

        </div>
    </>
    )}
</div>
  );
};

export default BuyerOrders;
