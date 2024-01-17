import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import FuncCurInEvntHndl from "./pages/FuncCurInEvntHndl";
import BackLayout from "./pages/BackLayout";
import Todo from "./pages/Todo";
import ConditionalPage from "./pages/ConditionalPage";
import CountDown from "./pages/CountDown";
import DropDownPage from "./pages/DropDownPage";
import OverFlowForElementsChecker from "./pages/OverflowForElementChecker";
import CallMultipleApis from "./pages/CallMulitpleApis";
import ModalPage from "./pages/ModalPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route element={<BackLayout />}>
          <Route
            path="function-curring-in-event-handler"
            element={<FuncCurInEvntHndl />}
          ></Route>

          <Route path="best-way-to-use-custom-hooks" element={<Todo />}></Route>
          <Route
            path="use-enum-for-conditional-rendering"
            element={<ConditionalPage />}
          ></Route>
          <Route path="count-down-hook" element={<CountDown />}></Route>
          <Route path="drop-down-page" element={<DropDownPage />}></Route>
          <Route
            path="overflow-for-elements-checker"
            element={<OverFlowForElementsChecker />}
          ></Route>
          <Route
            path="call-multiple-apis"
            element={<CallMultipleApis />}
          ></Route>
          <Route path="modal-page" element={<ModalPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
