import React, { useEffect, useState, useRef } from 'react';
import {useParams} from 'react-router-dom'
import api from '../utils/axiosInstance';

const ReceiptPage = () => {
    
    const receiptRef = useRef();
    const {orderId} = useParams()
    
    const [order, setOrder] = useState([]);

    const fetchOrder = async () => {
       
        // Fetch order details using the orderId from the URL params
        try {
            const response = await api.get(`sales/order/${orderId}`);
            console.log(response.data);
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    }

    useEffect(() => {
        // Fetch order details when the component mounts
        fetchOrder();
    }, []);
    
    /* useEffect(() => {
         
        setTimeout(() => {
        window.print();
        }, 500);
    }, []); */

    const handlePrint = () =>{
        const printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write('<html><head><title>Receipt</title></head><body>');
        printWindow.document.write(receiptRef.current.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    }

  return (
    <> 
    {order && order.items?.length > 0 && (
        <div
          ref={receiptRef}
          className="receipt-container"
          style={{ width: '80mm', margin: 'auto', padding: '20px', fontFamily: 'monospace' }}
        >
          <h2 style={{ textAlign: 'center' }}>🧾 Store Name</h2>
          <p>Date: {new Date(order.created_at).toLocaleString()}</p>
          <p>Buyer: {order.buyer.first_name} {order.buyer.last_name} {order.buyer.phone}</p>

          <hr />
      
          <h4>Items:</h4>
          <table width="100%" >
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>S.N</th>
                <th style={{ textAlign: 'left' }}>Item</th>
                <th style={{ textAlign: 'left' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={item.product_details.id} style={{ borderTop: '1px solid #000' }}>
                    <td>{index+1}</td> 
                    <td>{item.product_details.name}</td>
                    <td>{item.quantity}</td>
                    <td style={{ textAlign: 'right' }}>₹{(item.quantity * item.price)}</td>
                </tr>
              ))}
              <tr style={{ borderTop: '1px solid #000' }}>
                <td colSpan="3" style={{ textAlign: 'right' }}><strong>Subtotal:</strong></td>
                <td style={{ textAlign: 'right' }}>₹{order.total_price}</td>
              </tr>
              <tr style={{ borderTop: '1px solid #000' }}>
                <td colSpan="3" style={{ textAlign: 'right' }}><strong>Discount:</strong></td>
                <td style={{ textAlign: 'right' }}>₹{order.discount}</td>
              </tr>
            </tbody>
          </table>
          
          <hr/>
          <h3 style={{ textAlign: 'center' }}>Total: ₹{(order.total_price - order.discount)}</h3>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>Thank you for your purchase!</p>
        </div>
        
      )}
         <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={() => handlePrint()}>
                <i className="bi bi-printer"></i>
                Print Receipt
            </button>  
        </div>
      </>
  )
};

export default ReceiptPage;
