import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function EditarMaterial() {

    const { token } = useAuth();

    const urlBase = 'http://localhost:8080/clements-plast/materiales';

    let navegacion = useNavigate();

    const { id } = useParams();

    const [material, setMaterial] = useState({
        nombreMaterial: ''
    })

    const { nombreMaterial } = material;

    useEffect(() => {
        cargarMaterial();
    }, [])

    const cargarMaterial = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setMaterial(resultado.data);
    }

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo material)
        setMaterial({ ...material, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL

        await axios.put(`${urlBase}/${id}`, material, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        //Redirigimos a la pagina de inicio
        navegacion('/clement-plast/materiales');
    }

    return (
        <div className='container col-md-4'>
            <div className='container text-center' style={{ margin: '20px' }}>
                <h3>Editar Material</h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombreMaterial" className="form-label">Material</label>
                    <input type="text" className="form-control" id="nombreMaterial" name='nombreMaterial' required={true} value={nombreMaterial} onChange={(e) => onInputChange(e)} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3">Guardar</button>
                    <Link to='/clement-plast/materiales' className='btn btn-danger btn-md'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}
