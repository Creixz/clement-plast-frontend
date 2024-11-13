import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function EditarEspesor() {

    const { token } = useAuth();

    const urlBase = 'http://localhost:8080/clements-plast/espesores';

    let navegacion = useNavigate();

    const { id } = useParams();

    const [espesor, setEspesor] = useState({
        nombreEspesor: ''
    })

    const { nombreEspesor } = espesor;

    useEffect(() => {
        cargarEspesor();
    }, [])

    const cargarEspesor = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setEspesor(resultado.data);
    }

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo espesor)
        setEspesor({ ...espesor, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL

        await axios.put(`${urlBase}/${id}`, espesor, {
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
                <h3>Editar Espesor</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombreEspesor" className="form-label">Espesor</label>
                    <input type="text" className="form-control" id="nombreEspesor" name='nombreEspesor' required={true} value={nombreEspesor} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3">Guardar</button>
                    <Link to='/clement-plast/espesores' className='btn btn-danger btn-md'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}
