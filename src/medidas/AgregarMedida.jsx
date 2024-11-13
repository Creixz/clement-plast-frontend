import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function AgregarMedida() {

    const { token } = useAuth();

    let navegacion = useNavigate();

    const [medida, setMedida] = useState({
        nombreMedida: ''
    })

    const { nombreMedida } = medida;

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo medida)
        setMedida({ ...medida, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL
        const urlBase = 'http://localhost:8080/clements-plast/medidas';
        await axios.post(urlBase, medida, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        //Redirigimos a la pagina de inicio
        navegacion('/clement-plast/medidas');
    }

    return (
        <div className='container col-md-4'>
            <div className='container text-center' style={{ margin: '20px' }}>
                <h3>Agregar Medida</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombreMedida" className="form-label">Medida</label>
                    <input type="text" className="form-control" id="nombreMedida" name='nombreMedida' required={true} value={nombreMedida} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3">Agregar Medida</button>
                    <Link to='/clement-plast/medidas' className='btn btn-danger btn-md'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}
