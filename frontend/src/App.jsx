import Login from './pages/Login'
import React from 'react'
import ProductListPage from './pages/ProductListPage'
import Cart from './pages/Cart'
import {Layout} from "./Components/layout/Layout"

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import PrivateRoute from "./Components/PrivateRoute.jsx";
import CheckoutPage from './pages/CheckoutPage.jsx'
import ReceiptPage from './pages/ReceiptPage.jsx'


function App() {
   
    const router = createBrowserRouter(
      createRoutesFromElements(
          <Route path='/' element={<Layout/>}>
              <Route element={<PrivateRoute/>}>
                  <Route path="/" element={<ProductListPage/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/checkout" element={<CheckoutPage/>}/>  
                  <Route path="/print/receipt/:orderId" element={<ReceiptPage/>}/> 
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
