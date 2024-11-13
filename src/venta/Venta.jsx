import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { RiDeleteBinFill } from "react-icons/ri";

export default function VentaForm() {

  const { mote, token } = useAuth();

  const urlBaseFactura = 'http://localhost:8080/clements-plast/ventas/ultima-factura';
  const urlBaseUsuario = 'http://localhost:8080/clements-plast/usuarios/username';
  const urlBaseClientes = 'http://localhost:8080/clements-plast/clientes';
  const urlBaseProductos = 'http://localhost:8080/clements-plast/productos';

  const [ultimaFactura, setUltimaFactura] = useState('');
  const [usuario, setUsuario] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosInfo, setProductosInfo] = useState([]);

  let navegacion = useNavigate();


  useEffect(() => {
    cargarNuevoNumeroFactura();
    cargarUsuario();
    cargarClientes();
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    console.log(mote);
    const resultado = await axios.get(urlBaseProductos, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resultado.data);
    setProductos(resultado.data);

  }

  const cargarClientes = async () => {
    try {
      const resultado = await axios.get(urlBaseClientes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClientes(resultado.data);
    } catch (error) {
      console.error('Error al cargar clientes', error);
      console.log('Error de red:', error.message);
    }
  }

  const cargarUsuario = async () => {
    const resultado = await axios.get(`${urlBaseUsuario}/${mote}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsuario(resultado.data)
    console.log(resultado.data)
  }

  const cargarNuevoNumeroFactura = async () => {
    const resultado = await axios.get(urlBaseFactura, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const nuevoNumeroFactura = siguienteNumeroFactura(resultado.data);
    setUltimaFactura(nuevoNumeroFactura);
  }


  function siguienteNumeroFactura(numeroFactura) {
    // Paso 1: Eliminar 'F' al principio
    const numeroSinF = numeroFactura.slice(1);

    // Paso 2: Convertir a entero
    const numeroEntero = parseInt(numeroSinF, 10);

    // Paso 3: Incrementar en uno
    const nuevoNumeroEntero = numeroEntero + 1;

    // Paso 4: Convertir de nuevo a cadena y agregar 'F' al principio
    const nuevoNumeroFactura = 'F' + nuevoNumeroEntero.toString().padStart(numeroSinF.length, '0');

    return nuevoNumeroFactura;
  }

  const [ventaDTO, setVentaDTO] = useState({
    nroFactura: '',
    fechaVenta: '',
    idUsuario: '',
    idCliente: ''
  })


  const [detalleVentaDTO, setDetalleVentaDTO] = useState([])

  const obtenerFechaActual = () => {
    return new Date().toISOString().replace('Z', '');
  };

  const { nroFactura, fechaVenta, idUsuario, idCliente } = ventaDTO


  const [productoSeleccionado, setProductoSeleccionado] = useState({
    idProducto: '',
    cantidad: 0,
  });


  const onInputChange = (e) => {
    setProductoSeleccionado({ ...productoSeleccionado, [e.target.name]: e.target.value });
  };

  const agregarProducto = () => {
    setDetalleVentaDTO((prevDetalleVenta) => {
      const nuevoDetalleVenta = [...prevDetalleVenta, productoSeleccionado];
      setProductoSeleccionado({
        idProducto: '',
        cantidad: 0,
      });

      // Llamar a la función después de actualizar detalleVentaDTO
      obtenerInformacionProductos(nuevoDetalleVenta);

      return nuevoDetalleVenta;
    });
  };

  const obtenerInformacionProductos = async (nuevoDetalleVenta) => {
    if (!nuevoDetalleVenta || nuevoDetalleVenta.length === 0) {
      setProductosInfo([]); // Reiniciar la información si no hay productos
      return;
    }

    const infoPromises = nuevoDetalleVenta.map(async (prod) => {
      try {
        const response = await axios.get(`${urlBaseProductos}/${prod.idProducto}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          return response.data;
        } else {
          console.error(`Error al obtener información del producto ${prod.idProducto}`);
          return null;
        }
      } catch (error) {
        console.error(`Error al obtener información del producto ${prod.idProducto}`, error);
        return null;
      }
    });

    const productosInfoResueltos = await Promise.all(infoPromises);
    const productosInfoFiltrados = productosInfoResueltos.filter((info) => info !== null);
    setProductosInfo(productosInfoFiltrados);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(usuario.idUsuario);

    ventaDTO.fechaVenta = new Date().toISOString().replace('Z', '');;
    ventaDTO.nroFactura = ultimaFactura;
    ventaDTO.idUsuario = usuario.idUsuario;

    console.log(ventaDTO);

    const urlBase = 'http://localhost:8080/clements-plast/ventas';
    await axios.post(urlBase, {
      ventaDTO: ventaDTO,
      detallesVentaDTO: detalleVentaDTO
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(ventaDTO);
    console.log(detalleVentaDTO)
    console.log("venta exitosa");

    //Redirigimos a la pagina de inicio
    navegacion('/clement-plast/ventas');

  };

  const onInputChange2 = (e) => {
    setVentaDTO({ ...ventaDTO, [e.target.name]: e.target.value })
  }

  const totalAPagar = productosInfo.reduce((total, productoInfo, indice) => {
    const subtotal = productoInfo.precioPaquete * detalleVentaDTO[indice].cantidad;
    return total + subtotal;
  }, 0);

  const eliminarProducto = (indice) => {
    setProductosInfo((prevProductosInfo) => {
      const nuevosProductosInfo = [...prevProductosInfo];
      nuevosProductosInfo.splice(indice, 1);
      return nuevosProductosInfo;
    });

    setDetalleVentaDTO((prevDetalleVenta) => {
      const nuevoDetalleVenta = [...prevDetalleVenta];
      nuevoDetalleVenta.splice(indice, 1);
      return nuevoDetalleVenta;
    });
  };

  return (
    <section className="home-section">
      <div className="home-content">
        <i className="fas fa-list"></i>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <section id="usuarios">
          <div className="containeer m-3">
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-3">
                  <div className="card-header">
                    <h4>Crear venta</h4>
                  </div>
                  <div className="card-body">
                    <div className="form-group mb-2">
                      <label htmlFor="ultimaFactura">Nº Factura:</label>
                      <input type="text" className="form-control" name="ultimaFactura" value={ultimaFactura} readOnly />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="empleado">Vendedor:</label>
                      <input type="text" className="form-control" name="empleado" value={usuario.nombre + " " + usuario.apellidos} readOnly />
                    </div>
                    <div className="form-group mb-2">
                      <label className='mb-2' htmlFor="cliente"><b>Cliente</b></label>
                      <select
                        className="form-control"
                        name="idCliente"
                        value={idCliente}
                        onChange={(e) => onInputChange2(e)}
                        required
                      >
                        <option value="">-</option>
                        {clientes.map((cliente) => (
                          <option key={cliente.idCliente} value={cliente.idCliente}>
                            {cliente.nombre + " " + cliente.apellidos}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mb-2">
                      <label className='mb-2' htmlFor="producto"><b>Producto</b></label>
                      <select
                        className="form-control"
                        name="idProducto"
                        value={productoSeleccionado.idProducto}
                        onChange={(e) => onInputChange(e)}
                        required
                      >
                        <option value="">-</option>
                        {productos.map((producto) => (
                          <option key={producto.idProducto} value={producto.idProducto}>
                            {producto.codigo + " " + producto.nombreCategoria + " " + producto.nombreMaterial + " " + producto.nombreColor + " " + producto.nombreMedida + " x " + producto.nombreEspesor}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="cantidad">Cantidad de paquetes:</label>
                      <input type="number" className="form-control" name="cantidad" value={productoSeleccionado.cantidad} onChange={(e) => onInputChange(e)} required />
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="button" className="btn btn-primary" onClick={agregarProducto}>
                      <i className="fas fa-plus-square"></i> Agregar
                    </button>
                    <button onClick={onSubmit} className="btn btn-success">Generar Venta</button>
                    <Link className="btn btn-danger" to="/clement-plast/ventas"><i className="fas fa-times-circle"></i> Eliminar</Link>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Productos vendidos:</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        productosInfo.map((productoInfo, indice) => (
                          <tr key={indice}>
                            <th scope="row">{indice + 1}</th>
                            <td>{productoInfo.codigo}</td>
                            <td>S/. {productoInfo.precioPaquete}</td>
                            <td>{detalleVentaDTO[indice].cantidad}</td>
                            <td>S/. {productoInfo.precioPaquete * detalleVentaDTO[indice].cantidad}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => eliminarProducto(indice)}
                              >
                                <RiDeleteBinFill />
                              </button>
                            </td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                </div>
                <br />
                <div className="card">
                  <div className="form-group my-3 mx-3">
                    <label htmlFor="total">Total a Pagar:</label>
                    <input type="text" className="form-control" name="total" value={"S/. " + totalAPagar} readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </section>
  );
};



