import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegistered } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ReactPaginate from 'react-paginate';
import './ListadoVenta.css';

export default function ListadoVentas() {
  const { mote, role, token } = useAuth();

  const urlBase = 'http://localhost:8080/clements-plast/ventas';

  const [ventas, setVentas] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const ventasPerPage = 5; // Número de ventas por página

  useEffect(() => {
    cargarVentas();
  }, [pageNumber, startDate, endDate]);

  const cargarVentas = async () => {
    try {
      const resultado = await axios.get(urlBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVentas(resultado.data);
    } catch (error) {
      console.error('Error al cargar las ventas', error);
    }
  };

  const pageCount = Math.ceil(ventas.length / ventasPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = () => {

    // Si el campo de búsqueda está vacío, cargar todas las ventas
    if (!searchTerm.trim()) {
      cargarVentas();
      return;
    }

    // Filtrar ventas según el término de búsqueda en número de factura, usuario o cliente
    const filtered = ventas.filter(
      (venta) =>
        venta.nroFactura.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venta.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venta.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVentas(filtered);
  };

  const filtrarVentasPorFecha = () => {
    // Validar que ambas fechas estén presentes
    if (!startDate || !endDate) {
      alert('Debes ingresar ambas fechas para realizar la búsqueda');
      return;
    }

    // Validar que la fecha de inicio no sea mayor que la fecha de fin
    if (new Date(startDate) > new Date(endDate)) {
      alert('La fecha de inicio no puede ser mayor que la fecha de fin');
      return;
    }

    // Filtrar ventas por fecha
    const filteredByDate = ventas.filter((venta) => {
      const ventaDate = new Date(venta.fechaVenta);
      return ventaDate >= new Date(startDate) && ventaDate <= new Date(endDate);
    });

    setVentas(filteredByDate);
  };

  const resetearFechas = () => {
    setStartDate('');
    setEndDate('');
    cargarVentas();
  };

  return (
    <div className="container text-center">
      <section id="actions" className="py-4 mb-2">
        <div>
          <div className="row">
            <div className="col-md-3">
              {/* Agrega el campo de búsqueda y el botón */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                  Buscar
                </button>
              </div>
            </div>
            <div className="col-md-2">
              <div className="d-grid gap-2">
                <Link to="/clement-plast/ventas/generar" className="btn btn-success">
                  <FaRegistered style={{ marginTop: '-3px', marginRight: '4px', fontSize: '20px' }} /> Generar Venta
                </Link>
              </div>
            </div>
            <div className="col-md-7">
              <div className='fifi'>
                <label>Fecha Inicial:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className='fifi'>
                <label>Fecha Final:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button className='buscar' onClick={filtrarVentasPorFecha}>Buscar</button>
              <button className='btn btn-primary' onClick={resetearFechas}>Reiniciar</button>
            </div>
          </div>
        </div>
      </section>




      <table className="table table-striped table-hover align-middle mt-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">N° Comprobante</th>
            <th scope="col">Usuario</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha de Venta</th>
            <th scope="col">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ventas
            .slice(pageNumber * ventasPerPage, (pageNumber + 1) * ventasPerPage)
            .map((venta, indice) => {
              // Formatear la fecha (suponiendo que venta.fechaVenta es una cadena de fecha válida)
              const fechaFormateada = new Date(venta.fechaVenta).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <tr key={indice}>
                  <th scope="row">{venta.nroFactura}</th>
                  <td>{venta.usuario}</td>
                  <td>{venta.cliente}</td>
                  <td>{fechaFormateada}</td>
                  <td>S/. {venta.total}</td>
                  <td className="text-center">
                    <div>
                      <div>
                        <Link to={`/clement-plast/ventas/${venta.idVenta}`} className="btn btn-warning btn-sm me-3">
                          Detalles
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
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
