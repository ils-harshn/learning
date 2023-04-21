import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages/auth";
import { Home } from "./pages/screens";
import Layout from "./pages/screens/Layout";
import ProductDetails from "./pages/screens/ProductDetails";
import CartDetails from "./pages/screens/CartDetails";
import CartOrder from "./pages/screens/CartOrder";
import Orders from "./pages/screens/Orders";


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
          <Route path="/cart/order/" element={<CartOrder />} />
          <Route path="/orders/" element={<Orders/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;