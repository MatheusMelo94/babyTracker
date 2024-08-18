import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Cantidad de comidas en la última semana',
        },
    },
};

const AnalisisCantComidaUltimaSemana = () => {
    const listado = useSelector(state => state.evento.listado);
    const [cantComida, setCantComida] = useState([]);

    useEffect(() => {
        const hoy = new Date();
        const ultimos7Dias = [];
        for (let i = 6; i >= 0; i--) {
            const dia = new Date(hoy);
            dia.setDate(hoy.getDate() - i);
            ultimos7Dias.push(dia.toISOString().split('T')[0]);
        }

        // Contar las comidas por día
        const comidasPorDia = ultimos7Dias.map(fecha =>
            listado.filter(evento =>
                evento.idCategoria === 31 && evento.fecha.startsWith(fecha)
            ).length
        );

        setCantComida(comidasPorDia);
    }, [listado]);

    return (
        <div>
            <Bar 
                options={options} 
                data={{
                    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], 
                    datasets: [
                        {
                            label: 'Cantidad de comidas',
                            data: cantComida,
                            backgroundColor: 'rgb(104,163,254)',
                        }
                    ],
                }} 
            />
        </div>
    );
}

export default AnalisisCantComidaUltimaSemana;
