import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout, { AuthLayout } from "./pages/Layouts";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home/Index";
import Verify from "./pages/Verify";
import ResetPassword from "./pages/ResetPassword";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import Questions from "./pages/Questions";
import AskQuestion from "./pages/AskQuestion";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
            <Route path="rooms" element={<h3>Rooms</h3>} />
            <Route path="questions">
              <Route index element={<Questions />}/>
              <Route path="ask" element={<AskQuestion />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;