import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout, { AuthLayout } from "./pages/Layouts";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home/Index";
import Verify from "./pages/Verify";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="accounts" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="verify" element={<Verify />} />
          <Route path="forgetpassword" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>);
}

export default App;