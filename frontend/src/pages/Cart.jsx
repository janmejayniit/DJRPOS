import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import QuantityInput from '../components/QuantityInput ';

const CartSidebar = () => {
  const { cartItems, removeFromCart, addToCart, updateItemQuantity } = useCart();

    

  return (
    <div className='container mx-auto'>
    <div className="card shadow mt-3">
      <h3 className="card-header">Cart</h3>
        <div className="card-body">
            <table className="table table-striped">
            <thead>
                <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map(item => (
                    <tr key={item.id} className="flex justify-between mb-2">
                        <td className=" items-center">
                            <img src="product.png" alt={item.name} style={{width:'15%'}} className="w-16 h-16 mr-2" /><br/>
                            <span>{item.name}</span>
                        </td>
                        <td className=" items-center">
                        {/* <div className="input-group">
                        
                            <button className="btn btn-dark" type="button"  style={{borderRadius:'0px'}}>
                            <i className="bi bi-dash"></i>  
                            </button>
                            
                            <input type="text" id="quantity" className="form-control text-center" value={item.quantity} readonly/>
                            
                            <button className="btn btn-dark" type="button"  style={{borderRadius:'0px'}}>
                            <i className="bi bi-plus"></i>  
                            </button>
                        </div>  */}
                        {/* <QuantityInput item={item} onChange={(quantity) => addToCart({ ...item, quantity })} /> */}
                        <QuantityInput item={item} onChange={(newQty) => updateItemQuantity(item.id, newQty)} />

                        </td>
                        <td className=" items-center">
                            <span>₹{item.price}</span>
                        </td>
                        <td className=" items-center">
                            <span>₹{item.price * item.quantity}</span>
                        </td>
                        <td className=" items-center">
                            <a href="javascript:;" onClick={() => removeFromCart(item.id)} className="danger">🗑</a>
                        </td>
                    </tr>
          
        
                ))}
            </tbody>
            </table>
      </div>
      <div className="card-footer">
        <Link className="btn btn-dark btn-sm" to="/checkout">Checkout</Link>    
        </div>
    </div>
    </div>
  );
};
    
export default CartSidebar;
