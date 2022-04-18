import "./sass/main.scss";
import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";

// Check
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Home />} />
    </Routes>
  );
}

export default App;
