import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "./components/Registro/Regristro";
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal';
import AreasNaturales from './components/AreasNaturales/AreasNaturales';
import IniciarSesion from './components/IniciarSesion/IniciarSesion';
import ActividadesConservacion from './components/ActividadesConservacion/ActividadesConservacion';
import EspeciesAvistadas from './components/EspeciesAvistadas/EspeciesAvistadas';
import UserProfile from './components/UserProfile/UserProfile';
import Mapa from "./components/Mapa";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/iniciarsesion" element={<IniciarSesion />} />
        <Route path="/areasnaturales" element={<AreasNaturales />} />
        <Route path="/actividadesconservacion" element={<ActividadesConservacion />} />
        <Route path="/especiesavistadas" element={<EspeciesAvistadas />} /> 
        <Route path="/userprofile" element={<UserProfile />} /> 
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
    </Router>
  );
}

export default App;



