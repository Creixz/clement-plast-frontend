import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function AgregarUsuario() {

    const { token } = useAuth();

    let navegacion = useNavigate();

    const urlBaseRol = 'http://localhost:8080/clements-plast/roles';

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        cargarRoles();
    }, [])

    const cargarRoles = async () => {
        const resultado = await axios.get(urlBaseRol, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setRoles(resultado.data);
    }

    const [usuario, setUsuario] = useState({
        username: '',
        password: '',
        nombre: '',
        apellidos: '',
        dni: '',
        celular: '',
        correo: '',
        fecha_nacimiento: '',
        idRol: ''
    })

    const { username, password, nombre, apellidos, dni, celular, correo, fecha_nacimiento, idRol } = usuario;

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo empleado)
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL
        const urlBase = 'http://localhost:8080/clements-plast/register';
        await axios.post(urlBase, usuario, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        //Redirigimos a la pagina de inicio
        navegacion('/clement-plast/usuarios');
    }

    return (
        <div className='container col-md-6'>
            <div className='container text-center' style={{ margin: '20px' }}>
                <h3>Agregar Usuario</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label"><b>Username</b></label>
                    <input type="text" className="form-control" id="username" name='username' required={true} value={username} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><b>Contraseña</b></label>
                    <input type="password" className="form-control" id="password" name='password' required={true} value={password} onChange={(e) => onInputChange(e)} />
                </div>
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
                    <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento</label>
                    <input type="date" className="form-control" id="fecha_nacimiento" name='fecha_nacimiento' required={true} value={fecha_nacimiento} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-2' htmlFor="rol"><b>Rol</b></label>
                    <select
                        className="form-control"
                        name="idRol"
                        value={idRol}
                        onChange={(e) => onInputChange(e)}
                        required
                    >
                        <option value="">-</option>
                        {roles.map((rol) => (
                            <option key={rol.idRol} value={rol.idRol}>
                                {rol.rol}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3 mb-3">Agregar</button>
                    <Link to='/clement-plast/usuarios' className='btn btn-danger btn-md mb-3'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}