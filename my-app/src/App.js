import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "./components/Registro/Regristro";
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal';
import AreasNaturales from './components/AreasNaturales/AreasNaturales';
import IniciarSesion from './components/IniciarSesion/IniciarSesion';
import CargaDeDatos from'./components/CargaDeDatos/CargaDeDatos';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciarsesion" element={<IniciarSesion />} />
        <Route path="/areasnaturales" element={<AreasNaturales />} />
        <Route path="/cargadedatos" element={<CargaDeDatos />} />
      </Routes>
    </Router>
  );
}

export default App;



