import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './navegacion.css'
import { TbLogout } from "react-icons/tb";
import { PiStarOfDavidFill } from "react-icons/pi";
import { FaUserTie } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import { BsPersonFillUp } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import { useAuth } from '../AuthContext';

export default function Navegacion() {

  const { mote, role, token, login, logout } = useAuth();

  const handleLogoutClick = () => {
    // Ejecutar la función de logout al hacer clic en el enlace
    console.log("El token es: "+token)
    logout();
  };

  return (
    <div className='contenedor'>
      <nav className="navbar navbar-expand-lg bg-dark px-3">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/clement-plast/inicio"><PiStarOfDavidFill style={{ fontSize: '40px' }} /> Clement's Plast</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light" aria-current="page" to="/clement-plast/usuarios"><FaUserTie style={{ marginTop: '-5px', fontSize: '18px' }} /> Usuarios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/clement-plast/clientes"><FaUserTag style={{ marginTop: '-5px', fontSize: '18px' }} /> Clientes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/clement-plast/productos"><FaProductHunt style={{ marginTop: '-5px', fontSize: '15px' }} /> Productos</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-light" to="/clement-plast" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Clasificación
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/clement-plast/categorias">Categorias</Link></li>
                  <li><Link className="dropdown-item" to="/clement-plast/materiales">Materiales</Link></li>
                  <li><Link className="dropdown-item" to="/clement-plast/colores">Colores</Link></li>
                  <li><Link className="dropdown-item" to="/clement-plast/medidas">Medidas</Link></li>
                  <li><Link className="dropdown-item" to="/clement-plast/espesores">Espesores</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Todo</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-light" to="/clement-plast" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <AiFillDollarCircle style={{ marginTop: '-4px', fontSize: '18px' }} /> Ventas
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/clement-plast/ventas/generar"> Generar Venta</Link></li>
                  <li><Link className="dropdown-item" to="/clement-plast/ventas">Reporte de Ventas</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/clement-plast/inicio">Estadisticas</Link></li>
                </ul>
              </li>
            </ul>
            <span className="navbar-text text-light">
              <b>{mote} ({role.toLowerCase()})</b>
            </span>
            <span className="separador"></span>
            <a
              className="btn btn-outline-light"
              type="submit"
              href='/clement-plast/login'
              onClick={handleLogoutClick}
            >
              Logout <TbLogout style={{ marginTop: '-3px', fontSize: '20px' }} />
            </a>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
