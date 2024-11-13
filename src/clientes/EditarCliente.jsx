import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function EditarCliente() {

    const { token } = useAuth();

    const urlBase = 'http://localhost:8080/clements-plast/clientes';

    let navegacion = useNavigate();

    const { id } = useParams();

    const [cliente, setCliente] = useState({
        nombre: '',
        apellidos: '',
        dni: '',
        celular: '',
        correo: '',
        direccion: ''
    })

    const { nombre, apellidos, dni, celular, correo, direccion } = cliente;

    useEffect(() => {
        cargarCliente();
    }, [])

    const cargarCliente = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setCliente(resultado.data);
    }

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo empleado)
        setCliente({ ...cliente, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL

        await axios.put(`${urlBase}/${id}`, cliente, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        //Redirigimos a la pagina de inicio
        navegacion('/clement-plast/clientes');
    }

    return (
        <div className='container col-md-6'>
            <div className='container text-center' style={{ margin: '20px' }}>
                <h3>Editar Cliente</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name='nombre' required={true} value={nombre} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" className="form-control" id="apellidos" name='apellidos' required={true} value={apellidos} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input type="text" className="form-control" id="dni" name='dni' required={true} value={dni} onChange={(e) => onInputChange(e)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Celular</label>
                    <input type="text" className="form-control" id="celular" name='celular' required={true} value={celular} onChange={(e) => onInputChange(e)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input type="email" className="form-control" id="correo" name='correo' required={true} value={correo} onChange={(e) => onInputChange(e)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" name='direccion' required={true} value={direccion} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3">Guardar</button>
                    <Link to='/clement-plast/clientes' className='btn btn-danger btn-md'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}