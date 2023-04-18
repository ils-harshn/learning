import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Register } from "./pages/auth";
import { Home } from "./pages/screens";
import { useEffect } from "react";


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='auth'>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='cart' element={<h2>Cart</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;