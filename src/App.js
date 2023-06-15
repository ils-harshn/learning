import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./pages/Layouts";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="accounts" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>);
}

export default App;