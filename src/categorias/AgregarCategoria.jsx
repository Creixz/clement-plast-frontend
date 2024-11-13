import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function AgregarCategoria() {

    const { token } = useAuth();

    let navegacion = useNavigate();

    const [categoria, setCategoria] = useState({
        nombreCategoria: ''
    })

    const { nombreCategoria } = categoria;

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo categoria)
        setCategoria({ ...categoria, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL
        const urlBase = 'http://localhost:8080/clements-plast/categorias';
        await axios.post(urlBase, categoria, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        //Redirigimos a la pagina de inicio
        navegacion('/clement-plast/categorias');
    }

    return (
        <div className='container col-md-4'>
            <div className='container text-center' style={{ margin: '20px' }}>
                <h3>Agregar Categoria</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombreCategoria" className="form-label">Categoria</label>
                    <input type="text" className="form-control" id="nombreCategoria" name='nombreCategoria' required={true} value={nombreCategoria} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3">Agregar Categoria</button>
                    <Link to='/clement-plast/categorias' className='btn btn-danger btn-md'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}