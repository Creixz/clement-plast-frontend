import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


export default function ListadoVentas() {
    const { mote, role, token } = useAuth();
    const [totalVentas, setTotalVentas] = useState(0);
    const [ventasPorMes, setVentasPorMes] = useState([]);

    useEffect(() => {
        cargarTotalVentas();
        cargarVentasPorMesUltimoAño();
    }, []);

    const cargarTotalVentas = async () => {
        try {
            const resultado = await axios.get('http://localhost:8080/clements-plast/ventas', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Sumar los totales de todas las ventas
            const total = resultado.data.reduce((accumulator, venta) => accumulator + venta.total, 0);

            setTotalVentas(total);
        } catch (error) {
            console.error('Error al cargar el total de ventas', error);
        }
    };

    const cargarVentasPorMesUltimoAño = async () => {
        try {
            const resultado = await axios.get('http://localhost:8080/clements-plast/ventas', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Obtener el último año
            const ultimoAño = new Date().getFullYear();

            // Filtrar las ventas por el último año
            const ventasFiltradasUltimoAño = resultado.data.filter((venta) => {
                const añoVenta = new Date(venta.fechaVenta).getFullYear();
                return añoVenta === ultimoAño;
            });

            // Crear un objeto para almacenar las ventas por mes
            const ventasPorMesObj = {};

            // Iterar sobre las ventas filtradas y agrupar por mes
            ventasFiltradasUltimoAño.forEach((venta) => {
                const mesVenta = new Date(venta.fechaVenta).getMonth(); // Mes en base 0 (0 = enero, 1 = febrero, ...)
                const totalVenta = venta.total;

                if (!ventasPorMesObj[mesVenta]) {
                    ventasPorMesObj[mesVenta] = 0;
                }

                ventasPorMesObj[mesVenta] += totalVenta;
            });

            // Convertir el objeto a un array para facilitar la representación
            const ventasPorMesArray = Object.entries(ventasPorMesObj).map(([mes, total]) => ({
                mes: parseInt(mes, 10) + 1, // Sumar 1 para obtener el mes real (1 = enero, 2 = febrero, ...)
                total,
            }));

            setVentasPorMes(ventasPorMesArray);
            console.log(ventasPorMesArray);
        } catch (error) {
            console.error('Error al cargar las ventas por mes del último año', error);
        }
    };

    // Configuración de datos para el gráfico de barras
    const data = {
        labels: ventasPorMes.map((venta) => `Mes ${venta.mes}`),
        datasets: [
            {
                label: 'Ventas por Mes',
                data: ventasPorMes.map((venta) => venta.total),
                backgroundColor: 'rgba(25,135,84,0.4)',
                borderColor: 'rgba(25,135,84,1)',
                borderWidth: 2,
            },
        ],
    };

    // Configuración de opciones para el gráfico de barras
    const options = {
        maintainAspectRatio: false, // Permite que el gráfico se ajuste al tamaño del contenedor sin mantener una relación de aspecto constante
        responsive: true, // Permite que el gráfico sea responsive
        aspectRatio: 1.5, // Ajusta la relación de aspecto del gráfico (puedes experimentar con este valor)
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Establecer la altura del contenedor del gráfico
    const chartContainerStyle = {
        height: '400px', // Ajusta esta altura según tus necesidades
    };

    return (
        <div>
            <h2>Total de Ventas Acumulado</h2>
            <p>Total: S/. {totalVentas}</p>
            <div>
                <h2>Ventas por Mes del Último Año</h2>
                <ul>
                    {ventasPorMes.map((venta) => (
                        <li key={venta.mes}>
                            Mes {venta.mes}: S/. {venta.total}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="containere">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Gráfico de Barras</h2>
                        <div style={chartContainerStyle}>
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


