import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function AgregarEspesor() {

    const { token } = useAuth();

    let navegacion = useNavigate();

    const [espesor, setEspesor] = useState({
        nombreEspesor: ''
    })

    const { nombreEspesor } = espesor;

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo espesor)
        setEspesor({ ...espesor, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL
        const urlBase = 'http://localhost:8080/clements-plast/espesores';
        await axios.post(urlBase, espesor, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        //Redirigimos a la pagina de inicio
        navegacion('/clement-plast/espesores');
    }

    return (
        <div className='container col-md-4'>
            <div className='container text-center' style={{ margin: '20px' }}>
                <h3>Agregar Espesor</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombreEspesor" className="form-label">Espesor</label>
                    <input type="text" className="form-control" id="nombreEspesor" name='nombreEspesor' required={true} value={nombreEspesor} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3">Agregar Espesor</button>
                    <Link to='/clement-plast/espesores' className='btn btn-danger btn-md'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}
