import "./sass/main.scss";
import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";

// Check 2
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Home />} />
    </Routes>
  );
}

export default App;
