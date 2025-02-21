// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";  // Asegúrate de que esto está usando el nuevo método
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';  
import "bootstrap/dist/js/bootstrap.bundle.min";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);  // Asegúrate de que estás renderizando App en el root
