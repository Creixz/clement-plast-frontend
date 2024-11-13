import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegistered } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ReactPaginate from 'react-paginate';
import './ListadoClientes.css'; // Agrega estilos CSS para la paginación

export default function ListadoClientes() {
  const { role, token } = useAuth();

  const urlBase = 'http://localhost:8080/clements-plast/clientes';

  const [clientes, setClientes] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const clientesPerPage = 3; // Número de clientes por página

  useEffect(() => {
    cargarClientes();
  }, [pageNumber, searchTerm]);

  const cargarClientes = async () => {
    try {
      const resultado = await axios.get(urlBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClientes(resultado.data);
    } catch (error) {
      console.error('Error al cargar clientes', error);
      console.log('Error de red:', error.message);
    }
  };

  const pageCount = Math.ceil(clientes.length / clientesPerPage);

  const eliminarCliente = async (id) => {
    await axios.delete(`${urlBase}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cargarClientes();
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      cargarClientes();
      return;
    }
    // Filtrar ventas según el término de búsqueda en número de factura, usuario o cliente
    const filtered = clientes.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.dni.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setClientes(filtered);
  };

  return (
    <div className="container text-center">
      <section id="actions" className="py-4 mb-2">
        <div className="row">
          <div className="col-md-3">
            <Link to="/clement-plast/agregar-cliente" className="btn btn-success">
              <FaRegistered style={{ marginTop: '-3px', marginRight: '4px', fontSize: '20px' }} /> Registrar Cliente
            </Link>
          </div>
          <div className="col-md-9">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre, apellidos, DNI, etc."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      <table className="table table-striped table-hover align-middle mt-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">DNI</th>
            <th scope="col">Celular</th>
            <th scope="col">Correo</th>
            <th scope="col">Dirección</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientes.slice(pageNumber * clientesPerPage, (pageNumber + 1) * clientesPerPage)
          .map((cliente, indice) => (
            <tr key={indice}>
              <th scope="row">{pageNumber * clientesPerPage + indice + 1}</th>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellidos}</td>
              <td>{cliente.dni}</td>
              <td>{cliente.celular}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.direccion}</td>
              <td className="text-center">
                <div>
                  <Link to={`/clement-plast/clientes/${cliente.idCliente}`} className="btn btn-warning btn-sm me-3">
                    Editar
                  </Link>
                  {role === 'ADMINISTRADOR' ? (
                    <button onClick={() => eliminarCliente(cliente.idCliente)} className="btn btn-danger btn-sm">
                      Eliminar
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
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
  );
}
