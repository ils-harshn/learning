import "./App.css";
import Board from "./pages/Board";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateBoards from "./pages/CreateBoards";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateBoards />} />
        <Route path="/board/:id" element={<Board />} />
      </Routes>
    </Router>
  );
};

export default App;
