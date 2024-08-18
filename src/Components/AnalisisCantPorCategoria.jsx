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
            text: 'Cantidad por categoria',
        },
    },
};

const AnalisisCantPorCategoria = () => {
    const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
    const [cantidadesFiltradas, setCantidadesFiltradas] = useState([]);

    const listado = useSelector(state => state.evento.listado);
    const categoria = useSelector(state => state.evento.categorias);

    useEffect(() => {
        const categorias = categoria.map(c=>c.tipo);
        const totales = [
            listado.filter(elemento => elemento.idCategoria === 31).length, 
            listado.filter(elemento => elemento.idCategoria === 32).length, 
            listado.filter(elemento => elemento.idCategoria === 33).length, 
            listado.filter(elemento => elemento.idCategoria === 34).length, 
            listado.filter(elemento => elemento.idCategoria === 35).length, 
            listado.filter(elemento => elemento.idCategoria === 36).length  
        ];

        // Filtrar categorías y cantidades que no tienen registros
        const categoriasConRegistros = categorias.filter((cat, index) => totales[index] > 0); // en vez de cat podría ser _
        const cantidadesConRegistros = totales.filter(total => total > 0);

        setCategoriasFiltradas(categoriasConRegistros);
        setCantidadesFiltradas(cantidadesConRegistros);

    }, [listado]);

    return (
        <div>
            <Bar options={options} data={{
                labels: categoriasFiltradas,
                datasets: [
                    {
                        label: 'Cantidad',
                        data: cantidadesFiltradas,
                        backgroundColor: 'rgb(104,163,254)',
                    }
                ],
            }} />
        </div>
    )
}

export default AnalisisCantPorCategoria;
