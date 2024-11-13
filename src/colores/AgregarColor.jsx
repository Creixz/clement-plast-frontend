import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function AgregarColor() {

    const { token } = useAuth();

    let navegacion = useNavigate();

    const [color, setColor] = useState({
        nombreColor: ''
    })

    const { nombreColor } = color;

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo color)
        setColor({ ...color, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL
        const urlBase = 'http://localhost:8080/clements-plast/colores';
        await axios.post(urlBase, color, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        //Redirigimos a la pagina de inicio
        navegacion('/clement-plast/colores');
    }

    return (
        <div className='container col-md-4'>
            <div className='container text-center' style={{ margin: '20px' }}>
                <h3>Agregar Color</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombreColor" className="form-label">Color</label>
                    <input type="text" className="form-control" id="nombreColor" name='nombreColor' required={true} value={nombreColor} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3">Agregar Color</button>
                    <Link to='/clement-plast/colores' className='btn btn-danger btn-md'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}
