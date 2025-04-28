// src/pages/CheckoutPage.jsx
import {  useState, useEffect } from 'react';
import React from 'react';
import { useCart } from '../context/CartContext';
import api from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState({
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    });
  const [payment_method, setPaymentMethod] = useState('CASH');
  const [discount, setDiscount] = useState(0);
    const [buyerList, setBuyerList] = useState([]);

    const handleChange = (e) => {
      setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const payload = {
        cashier: localStorage.getItem('user_id'), 
        buyer: buyer,
        total_price: totalAmount,
        payment_method: payment_method, // or 'card'
        discount: 0,
        items: cartItems.map(item => ({
            product: item.id,
            quantity: item.quantity,
            price: item.price,
        })),    
    };

    try {
      const response = await api.post('sales/create/', payload);
        console.log(response.data);
        setCartItems([]); // clear cart
        const orderId = response.data.id;
        navigate(`/print/receipt/${orderId}`); // or receipt page
    } catch (err) {
        console.error(err);
        alert('Checkout failed.');
    }
  };

  const fetchBuyers = async () => {
    try {
      const response = await api.get('sales/buyers/');
      console.log(response.data);
        setBuyerList(response.data);
    } catch (error) {
      console.error('Error fetching buyers:', error);
    }
  }

  useEffect(() => {
    fetchBuyers();
  }, []);


  return (
    <div className="container mx-auto mt-5">
    <h2 className="text-2xl font-bold mb-4">Checkout</h2>
    {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
    ) : (
    <>
        <div className='row'>
            <div className='col-md-6'>
                <div className="card shadow mb-4">
                    <div className='card-header'>
                    <h5 className="font-semibold">Cart Items</h5>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                            {cartItems.map((item , index)=> (
                                <tr key={item.id} className="flex justify-between mb-2">
                                    <td className=" items-center">
                                        {index+1}
                                    </td>
                                    <td className=" items-center">
                                        <span>{item.name} x {item.quantity}</span>
                                    </td>
                                    <td className=" items-center">
                                        <span>₹{item.price * item.quantity}</span>
                                    </td>   
                                </tr>
                            ))
                            }
                        <tr>
                            <td colSpan="2" className="text-right font-semibold" align='right' >Total:</td>
                            <td className="font-semibold">₹{totalAmount.toFixed(2)}</td>
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
                        <div className='mb-2'>
                            <select value={payment_method}
                                onChange={(e) => setPaymentMethod(e.target.value)} className="form-control" >  
                                <option>Select Payment Method</option>
                                <option value="CASH">Cash</option>
                                <option value="CARD">Card</option>
                                <option value="UPI">UPI</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>  
                        <div className='mb-4'>
                        <select
                            className="form-control"
                            value={buyer?.id || ''}
                            onChange={(e) => {
                                const selectedId = e.target.value?parseInt(e.target.value):0;
                                if (selectedId === 0 || selectedId === '') {
                                     
                                    setBuyer({
                                        first_name: '',
                                        last_name: '',
                                        email: '',
                                        phone: ''
                                    });          // Clear current buyer
                                    // setIsNewBuyer(true);     // Show new buyer form
                                  } else {
                                    const selectedBuyer = buyerList.find(b => b.id === selectedId);
                                    setBuyer(selectedBuyer);
                                    // setIsNewBuyer(false);
                                  }

                                
                            }}
                            >
                            <option value="">Select Buyer</option>
                            <option value="0">Add New Buyer</option>
                            {buyerList.map((buyer) => (
                                <option key={buyer.id} value={buyer.id}>
                                {buyer.first_name} {buyer.last_name} ({buyer.phone})
                                </option>
                            ))}
                            </select>
                        </div>

                        <div className='mb-2'>
                            <input type="text" name="first_name" placeholder="Full Name" value={buyer.first_name}
                                onChange={handleChange} className="form-control" />
                        </div>
                        <div className='mb-2'>
                            <input type="text" name="last_name" placeholder="Last Name" value={buyer.last_name}
                                onChange={handleChange} className="form-control" />
                        </div>
                        <div className='mb-2'>
                            <input type="email" name="email" placeholder="Email" value={buyer.email}
                                onChange={handleChange} className="form-control " />
                        </div>
                        <div className='mb-2'>
                            <input type="text" name="phone" placeholder="Phone" value={buyer.phone}
                                onChange={handleChange} className="form-control" />
                        </div>
                        <button onClick={handleCheckout} className="btn btn-dark w-100 mt-3">
                            Complete Order
                        </button>
                    </div>

                </div>
            </div>

        </div>
    </>
    )}
</div>
  );
};

export default CheckoutPage;
