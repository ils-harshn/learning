import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages/auth";
import { Home } from "./pages/screens";
import Layout from "./pages/screens/Layout";
import ProductDetails from "./pages/screens/ProductDetails";
import CartDetails from "./pages/screens/CartDetails";
import CartOrder from "./pages/screens/CartOrder";
import Orders from "./pages/screens/Orders";
import SearchProducts from "./pages/screens/Search";


function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>

        <Route path='auth'>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/search/" element={<SearchProducts/>} />
          <Route path="/cart/" element={<CartDetails />} />
          <Route path="/cart/order/" element={<CartOrder />} />
          <Route path="/orders/" element={<Orders/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;