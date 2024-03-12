import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StartGame from "./components/StartGame";
import Game from "./components/Game";
import Joingame from "./components/Joingame";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/start" element={<StartGame />} />
        <Route path="/game" element={<Game />} />
        <Route path="/join-game" element={<Joingame />} />
      </Routes>
    </Router>
  );
}

export default App;
