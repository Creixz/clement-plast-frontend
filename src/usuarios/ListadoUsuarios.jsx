import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegistered } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useAuth } from '../AuthContext';


export default function ListadoUsuarios() {

  const { mote, role, token } = useAuth();

  const urlBase = 'http://localhost:8080/clements-plast/usuarios';

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, [])

  const cargarUsuarios = async () => {
    const resultado = await axios.get(urlBase, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resultado.data);
    console.log(role);
    console.log(mote);
    setUsuarios(resultado.data);
  }

  const eliminarUsuario = async (id) => {
    await axios.delete(`${urlBase}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    cargarUsuarios();
  }

  return (
    <div className='container text-center'>


      {role === 'ADMINISTRADOR' ?
        <section id="actions" className="py-4 mb-2">
          <div>
            <div className="row">
              <div className="d-grid gap-2 col-3">
                <Link to="/clement-plast/agregar-usuario" className="btn btn-success">
                  <FaRegistered style={{ marginTop: '-3px', marginRight: '4px', fontSize: '20px' }} /> Registrar Usuario
                </Link>
              </div>
            </div>
          </div>
        </section>
        : null}


      <table className="table table-striped table-hover align-middle mt-3" >
        <thead className='table-dark'>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Username</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">DNI</th>
            <th scope="col">Celular</th>
            <th scope="col">Correo</th>
            <th scope="col">F. Nacimiento</th>
            <th scope="col">Rol</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            usuarios.map((usuario, indice) => (
              <tr key={indice}>
                <th scope="row">{indice + 1}</th>
                <td>{usuario.username}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellidos}</td>
                <td>{usuario.dni}</td>
                <td>{usuario.celular}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.fecha_nacimiento}</td>
                <td>{usuario.rol.rol}</td>
                <td className='text-center'>
                  <div>
                    {role === 'ADMINISTRADOR' ?
                      <div>
                        <Link to={`/clement-plast/usuarios/${usuario.idUsuario}`}
                          className='btn btn-warning btn-sm me-3'><MdModeEdit style={{ fontSize: '18px', marginLeft: "0px" }} /></Link>
                        <button onClick={() => eliminarUsuario(usuario.idUsuario)}
                          className='btn btn-danger btn-sm' ><RiDeleteBinFill style={{ fontSize: '18px', marginLeft: "0px" }} />
                        </button>
                      </div>
                      : null}
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
