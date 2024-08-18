import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProximoBiberon = () => {
    const [proximoBiberon, setProximoBiberon] = useState('');
    const listado = useSelector(state => state.evento.listado);

    useEffect(() => {
        const calcularProximoBiberon = () => {
            const ultimaHora = listado
            .filter(evento => evento.idCategoria === 35) 
            .reduce((ultimo, evento) => 
                !ultimo || new Date(evento.fecha) > new Date(ultimo.fecha) ? evento : ultimo
            , null)?.fecha;

            if (ultimaHora) {
                const ultimaFecha = new Date(ultimaHora);
                const ahora = new Date();
                const proximoBiberonFecha = new Date(ultimaFecha.getTime() + 4 * 60 * 60 * 1000); 

                const tiempoRestante = proximoBiberonFecha - ahora;

                if (tiempoRestante > 0) {
                    const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
                    const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
                    setProximoBiberon(`${horas} horas y ${minutos} minutos`);
                } else {
                    setProximoBiberon('Es hora del próximo biberón!');
                }
            } else {
                setProximoBiberon('No se ha registrado ningún biberón aún.');
            }
        };

        calcularProximoBiberon();
    }, [listado]);

    const colorTexto = proximoBiberon.includes('próximo') ? 'red' : 'green';

    return (
        <div>
            <h4>Proximo Biberon:</h4>
            <h4 style={{ color: colorTexto }}>{proximoBiberon}</h4>
        </div>
    );
};

export default ProximoBiberon;
