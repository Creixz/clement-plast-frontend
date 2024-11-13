import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdAddBox } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function ListadoMedidas() {

  const { role, token } = useAuth();

  const urlBase = 'http://localhost:8080/clements-plast/medidas';

  const [medidas, setMedidas] = useState([]);

  useEffect(() => {
    cargarMedidas();
  }, [])

  const cargarMedidas = async () => {
    const resultado = await axios.get(urlBase, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resultado.data);
    setMedidas(resultado.data);
  }

  const eliminarMedida = async (id) => {
    await axios.delete(`${urlBase}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    cargarMedidas();
  }

  return (
    <div className='container text-center col-md-5'>
      {role === 'ADMINISTRADOR' ?
      <section id="actions" className="py-4 mb-2">
        <div>
          <div className="row">
            <div className="d-grid gap-2 col-5">
              <Link to="/clement-plast/agregar-medida" className="btn btn-success">
                <MdAddBox style={{ marginTop: '-3px', marginRight: '4px', fontSize: '20px' }} /> Agregar Medida
              </Link>
            </div>
          </div>
        </div>
      </section>: null}

      <table className="table table-striped table-hover align-middle mt-3" >
        <thead className='table-dark'>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Medida</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            medidas.map((medida, indice) => (
              <tr key={indice}>
                <th scope="row">{medida.idMedida}</th>
                <td>{medida.nombreMedida}</td>
                <td className='text-center'>
                {role === 'ADMINISTRADOR' ?
                  <div>
                    <Link to={`/clement-plast/medidas/${medida.idMedida}`}
                      className='btn btn-warning btn-sm me-3'>Editar</Link>
                    <button onClick={() => eliminarMedida(medida.idMedida)}
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
