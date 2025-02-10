import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "./components/Registro/Regristro";
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal';
import AreasNaturales from './components/AreasNaturales/AreasNaturales';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/areasnaturales" element={<AreasNaturales />} />
      </Routes>
    </Router>
  );
}

export default App;


