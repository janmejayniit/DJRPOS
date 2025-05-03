import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import {fetchOrderDetails } from '../api/apiStore'

const OrderDetails = () => {
     
    const {orderId} = useParams()
    const [order, setOrder] = useState([]);

   
    useEffect(() => {
            // Fetch order details when the component mounts
            fetchOrderDetails(orderId)
            .then(setOrder)
            .catch((err) => console.error("Failed to load products", err));
    }, []);
   


  return (
    <div className="container mx-auto mt-5">
    <h2 className="text-2xl font-bold mb-4">Checkout</h2>
    {order.length === 0 ? (
    <p>Order has not items.</p>
    ) : (
    <>
        <div className='row'>
            <div className='col-md-6'>
                <div className="card shadow mb-4">
                    <div className='card-header'>
                    <h5 className="font-semibold">Order Items</h5>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <tbody>
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
                            
                        <tr>
                            <td colSpan="3" className="text-right font-semibold" align='right' >Total:</td>
                            <td className="font-semibold">₹{order.total_price}</td>
                        </tr>   
                        </tbody>
                        </table>
                         
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div className='card shadow'>
                    <div className='card-header'>
                        <h5 className="font-semibold">Buyer Details</h5>
                    </div>
                    <div className='card-body'>
                        
                        <ul>
                            <li className="mb-2"><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</li>
                            <li className="mb-2"><strong>Payment Method:</strong> {order.payment_method}</li>
                            <li className="mb-2"><strong>Name:</strong> {order.buyer.first_name} {order.buyer.last_name}</li>
                            <li className="mb-2"><strong>Phone:</strong> {order.buyer.phone}</li>
                            <li className="mb-2"><strong>Email:</strong> {order.buyer.email}</li>
                            <li className="mb-2"><strong>Address:</strong> {order.buyer.address}</li>
                        </ul>

                         
                    </div>

                </div>
            </div>

        </div>
    </>
    )}
</div>
  );
};

export default OrderDetails;
