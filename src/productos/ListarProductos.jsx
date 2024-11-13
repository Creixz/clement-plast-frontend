import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegistered } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ReactPaginate from 'react-paginate';

export default function ListadoProductos() {

  const { role, token } = useAuth();

  const urlBase = 'http://localhost:8080/clements-plast/productos';

  const [productos, setProductos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const productosPerPage = 5; // Número de clientes por página

  useEffect(() => {
    cargarProductos();
  }, [pageNumber, searchTerm])

  const cargarProductos = async () => {
    const resultado = await axios.get(urlBase, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resultado.data);
    setProductos(resultado.data);
  }

  const pageCount = Math.ceil(productos.length / productosPerPage);

  const eliminarProducto = async (id) => {
    await axios.delete(`${urlBase}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    cargarProductos();
  }

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      cargarProductos();
      return;
    }
    // Filtrar ventas según el término de búsqueda en número de factura, usuario o cliente
    const filtered = productos.filter(
      (producto) =>
        producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductos(filtered);
  };

  return (
    <div className='container text-center'>
      {role === 'ADMINISTRADOR' ?
        <section id="actions" className="py-4 mb-2">
          <div>
            <div className="row">
              <div className="d-grid gap-2 col-3">
                <Link to="/clement-plast/agregar-producto" className="btn btn-success">
                  <FaRegistered style={{ marginTop: '-3px', marginRight: '4px', fontSize: '20px' }} /> Registrar Producto
                </Link>
              </div>
              <div className="col-md-9">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por código"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section> : null}

      <table className="table table-striped table-hover align-middle mt-3" >
        <thead className='table-dark'>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Codigo</th>
            <th scope="col">MillaresPorFardo</th>
            <th scope="col">PrecioMillar</th>
            <th scope="col">PrecioPaquete</th>
            <th scope="col">Stock</th>
            <th scope="col">Categoria</th>
            <th scope="col">Material</th>
            <th scope="col">Medida</th>
            <th scope="col">Color</th>
            <th scope="col">Espesor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            productos.slice(pageNumber * productosPerPage, (pageNumber + 1) * productosPerPage)
            .map((producto, indice) => (
              <tr key={indice}>
                <th scope="row">{pageNumber * productosPerPage + indice + 1}</th>
                <td>{producto.codigo}</td>
                <td>{producto.millaresPorFardo}</td>
                <td>{producto.precioMillar}</td>
                <td>{producto.precioPaquete}</td>
                <td>{producto.stock}</td>
                <td>{producto.nombreCategoria}</td>
                <td>{producto.nombreMaterial}</td>
                <td>{producto.nombreMedida}</td>
                <td>{producto.nombreColor}</td>
                <td>{producto.nombreEspesor}</td>
                <td className='text-center'>
                  {role === 'ADMINISTRADOR' ?
                    <div>
                      <Link to={`/clement-plast/productos/${producto.idProducto}`}
                        className='btn btn-warning btn-sm me-3'>Editar</Link>
                      <button onClick={() => eliminarProducto(producto.idProducto)}
                        className='btn btn-danger btn-sm' >Eliminar</button>
                    </div> : null}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Siguiente'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
      />
    </div>
  )
}