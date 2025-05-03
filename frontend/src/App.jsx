import Login from './pages/Login'
import React from 'react'
import ProductListPage from './pages/ProductListPage'
import Cart from './pages/Cart'
import {Layout} from "./Components/layout/Layout"

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import PrivateRoute from "./Components/PrivateRoute.jsx";
import CheckoutPage from './pages/CheckoutPage.jsx'
import ReceiptPage from './pages/ReceiptPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import OrderDetails from './pages/OrderDetails.jsx'
import './assets/icons.css'
import BuyerOrders from './pages/BuyerOrders.jsx'
import Logout from './pages/Logout.jsx'

function App() {
   
    const router = createBrowserRouter(
      createRoutesFromElements(
          <Route path='/' element={<Layout/>}>
              <Route element={<PrivateRoute/>}>
                  <Route path="" element={<Dashboard/>}/>
                  <Route path="/order/:orderId" element={<OrderDetails/>}/>
                  <Route path="/products" element={<ProductListPage/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/checkout" element={<CheckoutPage/>}/>  
                  <Route path="/print/receipt/:orderId" element={<ReceiptPage/>}/> 
                  <Route path="/order/buyer/:buyerId" element={<BuyerOrders/>}/> 
                  <Route path="/logout" element={<Logout/>}/>
              </Route>
              <Route path='/login' element={<Login />} />
             
        </Route>
      )
    )
  return (
    <>
      
      <div className="">
        <RouterProvider router={router} /> 
      </div>  
       
    </>
  )
}

export default App
