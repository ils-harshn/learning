import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages/auth";
import { Home } from "./pages/screens";
import { useEffect } from "react";
import { Protected } from "./utils";
import Layout from "./pages/screens/Layout";
import ProductDetails from "./pages/screens/ProductDetails";
import CartDetails from "./pages/screens/CartDetails";


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='auth'>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart/" element={<CartDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;