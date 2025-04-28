import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/apiStore';
import { useCart } from '../context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => console.error("Failed to load products", err));
  }, []);

    const increment = () => {   
        var quantity = document.getElementById("quantity").value;
        quantity++;
        document.getElementById("quantity").value = quantity;
    }
    const decrement = () => {   
        var quantity = document.getElementById("quantity").value;
        if(quantity > 1){
            quantity--;
            document.getElementById("quantity").value = quantity;
        }
    }

  return (
    <div className="container mt-5">
    <div className="mt-3">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className='row'>
      <ToastContainer />
        
            {products.map((product) => (
                <div className='col-md-2' key={product.id}>
                <div className="card shadow mb-4">
                <img src="product.png" alt={product.name} className="card-img-top" />
                <div className="card-body">
                    <p className="card-title" style={{fontSize:"14px",fontWeight:'bolder'}}>{product.name}</p>
                    <p className="card-text" style={{fontSize:'10px',fontWeight:'bolder'}}>Price: ₹{product.price}</p>
                    {/* <p className="card-text">Description: {product.description}</p> */}
            
                </div>
                <div className="card-footer" style={{backgroundColor:'white',borderTop:'none'}}>
                    <button className="btn btn-dark btn-sm" type="button" style={{borderRadius:'0px!important'}}  onClick={() => addToCart(product)}>Add to Cart</button>

                    {/* <div class="input-group">
                        
                        <button className="btn btn-dark" type="button" onclick="decrement()" style={{borderRadius:'0px'}}>
                        <i class="bi bi-dash"></i>  
                        </button>
                        
                        <input type="text" id="quantity" className="form-control text-center" value="1" readonly/>
                        
                        <button className="btn btn-dark" type="button" onclick="increment()" style={{borderRadius:'0px'}}>
                        <i class="bi bi-plus"></i>  
                        </button>
                    </div> */}
                 </div>
                </div>
                </div>
            ))}
       
        
      </div>
      
    </div>
    </div>
  );
};

export default ProductListPage;
