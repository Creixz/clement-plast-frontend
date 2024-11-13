import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListadoUsuarios from "./usuarios/ListadoUsuarios";
import Navegacion from "./plantilla/Navegacion";
import Login from "./login/Login.js";
import AgregarUsuario from "./usuarios/AgregarUsuario";
import EditarUsuario from "./usuarios/EditarUsuario";
import ListadoCategorias from "./categorias/ListadoCategorias";
import ListadoMateriales from "./materiales/ListadoMateriales";
import ListadoColores from "./colores/ListadoColores";
import ListadoMedidas from "./medidas/ListadoMedidas";
import ListadoEspesores from "./espesores/ListadoEspesores";
import AgregarCategoria from "./categorias/AgregarCategoria";
import AgregarColor from "./colores/AgregarColor";
import AgregarMaterial from "./materiales/AgregarMaterial";
import AgregarMedida from "./medidas/AgregarMedida";
import AgregarEspesor from "./espesores/AgregarEspesor";
import EditarCategoria from "./categorias/EditarCategoria";
import EditarMedida from "./medidas/EditarMedida";
import EditarMaterial from "./materiales/EditarMaterial";
import EditarColor from "./colores/EditarColor";
import EditarEspesor from "./espesores/EditarEspesor";
import ListadoClientes from "./clientes/ListadoClientes";
import AgregarCliente from "./clientes/AgregarCliente";
import EditarCliente from "./clientes/EditarCliente";
import ListadoProductos from "./productos/ListarProductos";
import AgregarProducto from "./productos/AgregarProducto";
import EditarProducto from "./productos/EditarProducto";
import { useState } from "react";
import { AuthProvider } from './AuthContext';
import 'stream-browserify';
import ListadoVentas from "./venta/ListadoVentas.jsx";
import DetalleVentas from "./venta/DetalleVenta.jsx";
import VentaForm from "./venta/Venta.jsx";
import Inicio from "./plantilla/Inicio.jsx"


function App() {

  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [mote, setMote] = useState('');

  return (

    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path="/clement-plast/login" element={<Login setToken={setToken} />} />
            <Route path="/clement-plast" element={<Navegacion />}>

              <Route path="/clement-plast/inicio" element={<Inicio />} />

              <Route path="/clement-plast/usuarios" element={<ListadoUsuarios />} />
              <Route path="/clement-plast/agregar-usuario" element={<AgregarUsuario />} />
              <Route path="/clement-plast/usuarios/:id" element={<EditarUsuario />} />

              <Route path="/clement-plast/clientes" element={<ListadoClientes />} />
              <Route path="/clement-plast/agregar-cliente" element={<AgregarCliente />} />
              <Route path="/clement-plast/clientes/:id" element={<EditarCliente />} />

              <Route path="/clement-plast/productos" element={<ListadoProductos />} />
              <Route path="/clement-plast/agregar-producto" element={<AgregarProducto />} />
              <Route path="/clement-plast/productos/:id" element={<EditarProducto />} />

              <Route path="/clement-plast/categorias" element={<ListadoCategorias />} />
              <Route path="/clement-plast/agregar-categoria" element={<AgregarCategoria />} />
              <Route path="/clement-plast/categorias/:id" element={<EditarCategoria />} />

              <Route path="/clement-plast/materiales" element={<ListadoMateriales />} />
              <Route path="/clement-plast/agregar-material" element={<AgregarMaterial />} />
              <Route path="/clement-plast/materiales/:id" element={<EditarMaterial />} />

              <Route path="/clement-plast/colores" element={<ListadoColores />} />
              <Route path="/clement-plast/agregar-color" element={<AgregarColor />} />
              <Route path="/clement-plast/colores/:id" element={<EditarColor />} />

              <Route path="/clement-plast/medidas" element={<ListadoMedidas />} />
              <Route path="/clement-plast/agregar-medida" element={<AgregarMedida />} />
              <Route path="/clement-plast/medidas/:id" element={<EditarMedida />} />

              <Route path="/clement-plast/espesores" element={<ListadoEspesores />} />
              <Route path="/clement-plast/agregar-espesor" element={<AgregarEspesor />} />
              <Route path="/clement-plast/espesores/:id" element={<EditarEspesor />} />

              <Route path="/clement-plast/ventas" element={<ListadoVentas />} />
              <Route path="/clement-plast/ventas/:id" element={<DetalleVentas />} />
              <Route path="/clement-plast/ventas/generar" element={<VentaForm />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
