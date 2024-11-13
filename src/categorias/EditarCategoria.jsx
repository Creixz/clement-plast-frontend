import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function EditarCategoria() {

    const { token } = useAuth();

    const urlBase = 'http://localhost:8080/clements-plast/categorias';

    let navegacion = useNavigate();

    const { id } = useParams();

    const [categoria, setCategoria] = useState({
        nombreCategoria: ''
    })

    const { nombreCategoria } = categoria;

    useEffect(() => {
        cargarCategoria();
    }, [])

    const cargarCategoria = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setCategoria(resultado.data);
    }

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo categoria)
        setCategoria({ ...categoria, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL

        await axios.put(`${urlBase}/${id}`, categoria, {
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
                <h3>Editar Categoria</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombreCategoria" className="form-label">Categoria</label>
                    <input type="text" className="form-control" id="nombreCategoria" name='nombreCategoria' required={true} value={nombreCategoria} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3">Guardar</button>
                    <Link to='/clement-plast/categorias' className='btn btn-danger btn-md'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}