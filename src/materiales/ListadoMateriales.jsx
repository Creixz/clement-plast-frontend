import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdAddBox } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function ListadoMateriales() {

  const { role, token } = useAuth();

  const urlBase = 'http://localhost:8080/clements-plast/materiales';

  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    cargarMateriales();
  }, [])

  const cargarMateriales = async () => {
    const resultado = await axios.get(urlBase, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resultado.data);
    setMateriales(resultado.data);
  }

  const eliminarMaterial = async (id) => {
    await axios.delete(`${urlBase}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    cargarMateriales();
  }

  return (
    <div className='container text-center col-md-5'>
      {role === 'ADMINISTRADOR' ?
      <section id="actions" className="py-4 mb-2">
        <div>
          <div className="row">
            <div className="d-grid gap-2 col-5">
              <Link to="/clement-plast/agregar-material" className="btn btn-success">
                <MdAddBox style={{ marginTop: '-3px', marginRight: '4px', fontSize: '20px' }} /> Agregar Material
              </Link>
            </div>
          </div>
        </div>
      </section>: null}

      <table className="table table-striped table-hover align-middle mt-3" >
        <thead className='table-dark'>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Material</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            materiales.map((material, indice) => (
              <tr key={indice}>
                <th scope="row">{material.idMaterial}</th>
                <td>{material.nombreMaterial}</td>
                <td className='text-center'>
                {role === 'ADMINISTRADOR' ?
                  <div>
                    <Link to={`/clement-plast/materiales/${material.idMaterial}`}
                      className='btn btn-warning btn-sm me-3'>Editar</Link>
                    <button onClick={() => eliminarMaterial(material.idMaterial)}
                      className='btn btn-danger btn-sm' >Eliminar</button>
                  </div>: null}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
