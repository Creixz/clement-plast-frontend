import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function DetalleVentas() {

  const { token } = useAuth();

  const urlBase = 'http://localhost:8080/clements-plast/ventas';

  useEffect(() => {
    cargarVenta();
  }, []);

  const { id } = useParams();

  const [venta, setVenta] = useState({
    nfactura: '',
    cliente: '',
    vendedor: '',
    fecha: '',
    detalleVentaDetallesDTO: [],
    total: ''
  })

  const { nfactura, cliente, vendedor, fecha, detalleVentaDetallesDTO, total } = venta

  const fechaFormateada = moment(fecha).format('YYYY-MM-DD HH:mm:ss');

  const cargarVenta = async () => {
    const resultado = await axios.get(`${urlBase}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setVenta(resultado.data)
  }

  const exportarPDF = () => {
    const pdf = new jsPDF();

    pdf.text('Detalle de Venta', 20, 20);
    pdf.text(`Nº Factura: ${nfactura}`, 20, 30);
    pdf.text(`Cliente: ${cliente}`, 20, 40);
    pdf.text(`Vendedor: ${vendedor}`, 20, 50);
    pdf.text(`Fecha: ${fechaFormateada}`, 20, 60);

    // Detalles de la venta
    pdf.text('Detalles de la Venta', 20, 80);
    pdf.autoTable({
      startY: 90,
      head: [['#', 'Producto', 'Precio', 'Cantidad', 'SubTotal']],
      body: detalleVentaDetallesDTO.map((detalle, index) => [
        index + 1,
        detalle.producto,
        `S/. ${detalle.precio}`,
        `${detalle.cantidad} paquetes`,
        `S/. ${detalle.subtotal}`,
      ]),
    });

    // Total
    pdf.text(`Total a pagar: S/. ${total}`, 20, pdf.autoTable.previous.finalY + 10);

    pdf.save('detalle_venta.pdf');
  };

  return (
    <section className="home-section">
      <div className="home-content">
        <i className="fas fa-list"></i>
      </div>

      <section id="actions" className="py-4 mb-2">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <Link to="/clement-plast/ventas" className="btn btn-warning">
                <i className="fas fa-arrow-left"></i> Regresar
              </Link>
            </div>
            <div className="col-md-2" style={{marginLeft:'-20px'}}>
              <button className="btn btn-primary" onClick={exportarPDF}>
                Exportar a PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="details">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Detalle venta</h4>
                </div>
                <div className="card-body">
                  {/* Resto del contenido del cuerpo de la tarjeta */}
                  <div className="form-group mb-2">
                    <label htmlFor="nfactura">Nº Factura</label>
                    <input type="text" className="form-control" name="nFactura" value={nfactura} readOnly />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="cliente">Cliente</label>
                    <input type="text" className="form-control" name="cliente" value={cliente} readOnly />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="vendedor">Vendedor</label>
                    <input type="text" className="form-control" name="vendedor" value={vendedor} readOnly />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="fecha">Fecha</label>
                    <input type="text" className="form-control" name="fecha" value={fechaFormateada} readOnly />
                  </div>
                  {/* ... Otros campos similares ... */}
                  <table className="table table-striped mt-3">
                    <thead className="table-primary">
                      <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>SubTotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Iteración sobre productos */}
                      {detalleVentaDetallesDTO.map((detalle, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{detalle.producto}</td>
                          <td>S/. {detalle.precio}</td>
                          <td>{detalle.cantidad} paquetes</td>
                          <td>S/. {detalle.subtotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="form-group mb-2">
                    <label htmlFor="direccion">Total a pagar:</label>
                    <input type="text" className="form-control" name="direccion" value={"S/. " + total} readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

