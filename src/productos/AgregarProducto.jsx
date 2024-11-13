import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function AgregarProducto() {

    const { token } = useAuth();

    const urlBaseCategoria = 'http://localhost:8080/clements-plast/categorias';
    const urlBaseMaterial = 'http://localhost:8080/clements-plast/materiales';
    const urlBaseColor = 'http://localhost:8080/clements-plast/colores';
    const urlBaseMedida = 'http://localhost:8080/clements-plast/medidas';
    const urlBaseEspesor = 'http://localhost:8080/clements-plast/espesores';

    const [categorias, setCategorias] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [colores, setColores] = useState([]);
    const [medidas, setMedidas] = useState([]);
    const [espesores, setEspesores] = useState([]);

    useEffect(() => {
        cargarCategorias();
        cargarMateriales();
        cargarColores();
        cargarMedidas();
        cargarEspesores();
    }, []);

    const cargarCategorias = async () => {
        const resultado = await axios.get(urlBaseCategoria, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setCategorias(resultado.data);
    }

    const cargarMateriales = async () => {
        const resultado = await axios.get(urlBaseMaterial, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setMateriales(resultado.data);
    }

    const cargarColores = async () => {
        const resultado = await axios.get(urlBaseColor, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setColores(resultado.data);
    }

    const cargarMedidas = async () => {
        const resultado = await axios.get(urlBaseMedida, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setMedidas(resultado.data);
    }

    const cargarEspesores = async () => {
        const resultado = await axios.get(urlBaseEspesor, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setEspesores(resultado.data);
    }

    let navegacion = useNavigate();

    const [producto, setProducto] = useState({
        codigo: '',
        millaresPorFardo: '',
        precioMillar: '',
        precioPaquete: '',
        stock: '',
        idCategoria: '',
        idMaterial: '',
        idMedida: '',
        idColor: '',
        idEspesor: ''
    })

    const { codigo, millaresPorFardo, precioMillar, precioPaquete, stock, idCategoria, idMaterial, idMedida, idColor, idEspesor } = producto;

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos del tipo empleado)
        const name = e.target.name;
        const value = e.target.value;
        setProducto({ ...producto, [name]: value });
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // evita que los parametros se envien en la URL
        const urlBaseProductos = 'http://localhost:8080/clements-plast/productos';
        await axios.post(urlBaseProductos, producto, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        //Redirigimos a la pagina de inicio
        navegacion('/clement-plast/productos');
    }

    return (
        <div className='container col-md-12'>
            <div className='container text-center' style={{ margin: '20px' }}>
                <h3><b>Agregar Producto</b></h3>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>

                <div className='d-flex'>
                    <div className='container col-md-6'>
                        <div className="mb-3">
                            <label htmlFor="codigo" className="form-label"><b>Código</b></label>
                            <input type="text" className="form-control" id="codigo" name='codigo' required={true} value={codigo} onChange={(e) => onInputChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="millaresPorFardo" className="form-label"><b>Cantidad de millares por fardo</b></label>
                            <input type="number" className="form-control" id="millaresPorFardo" name='millaresPorFardo' required={true} value={millaresPorFardo} onChange={(e) => onInputChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="precioMillar" className="form-label"><b>Precio por Millar</b></label>
                            <input type="number" className="form-control" id="precioMillar" name='precioMillar' required={true} value={precioMillar} onChange={(e) => onInputChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="precioPaquete" className="form-label"><b>Precio por paquete</b></label>
                            <input type="number" className="form-control" id="precioPaquete" name='precioPaquete' required={true} value={precioPaquete} onChange={(e) => onInputChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label"><b>Stock</b></label>
                            <input type="number" className="form-control" id="stock" name='stock' required={true} value={stock} onChange={(e) => onInputChange(e)} />
                        </div>
                    </div>

                    <div className='container col-md-6'>
                        <div className="form-group mb-3">
                            <label className='mb-2' htmlFor="categoria"><b>Categoria</b></label>
                            <select
                                className="form-control"
                                name="idCategoria"
                                value={idCategoria}
                                onChange={(e) => onInputChange(e)}
                                required
                            >
                                <option value="">-</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.idCategoria} value={categoria.idCategoria}>
                                        {categoria.nombreCategoria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label className='mb-2' htmlFor="material"><b>Material</b></label>
                            <select
                                className="form-control"
                                name="idMaterial"
                                value={idMaterial}
                                onChange={(e) => onInputChange(e)}
                                required
                            >
                                <option value="">-</option>
                                {materiales.map((material) => (
                                    <option key={material.idMaterial} value={material.idMaterial}>
                                        {material.nombreMaterial}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label className='mb-2' htmlFor="color"><b>Color</b></label>
                            <select
                                className="form-control"
                                name="idColor"
                                value={idColor}
                                onChange={(e) => onInputChange(e)}
                                required
                            >
                                <option value="">-</option>
                                {colores.map((color) => (
                                    <option key={color.idColor} value={color.idColor}>
                                        {color.nombreColor}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label className='mb-2' htmlFor="medida"><b>Medida</b></label>
                            <select
                                className="form-control"
                                name="idMedida"
                                value={idMedida}
                                onChange={(e) => onInputChange(e)}
                                required
                            >
                                <option value="">-</option>
                                {medidas.map((medida) => (
                                    <option key={medida.idMedida} value={medida.idMedida}>
                                        {medida.nombreMedida}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label className='mb-2' htmlFor="espesor"><b>Espesor</b></label>
                            <select
                                className="form-control"
                                name="idEspesor"
                                value={idEspesor}
                                onChange={(e) => onInputChange(e)}
                                required
                            >
                                <option value="">-</option>
                                {espesores.map((espesor) => (
                                    <option key={espesor.idEspesor} value={espesor.idEspesor}>
                                        {espesor.nombreEspesor}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                </div>




                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-md me-3">Agregar</button>
                    <Link to='/clement-plast/productos' className='btn btn-danger btn-md'>Regresar</Link>
                </div>
            </form>
        </div>
    )
}