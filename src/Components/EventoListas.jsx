import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { guardarListado} from '../features/eventoSlice';



const EventoListas = () => {
    const dispatch = useDispatch();
    const listado = useSelector(state => state.evento.listado);
    const categoria = useSelector(state => state.evento.categorias);



    const [eventosDelDia, setEventosDelDia] = useState([]);
    const [eventosDelDiaAnterior, setEventosDelDiaAnterior] = useState([]);

    const devuelveImg = idCategoria => {
        return categoria.find(c=> c.id === idCategoria).imagen;
     }


    const eliminarEvento = idEvento => {
        fetch(`https://babytracker.develotion.com/eventos.php?idEvento=${idEvento}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "apikey": localStorage.getItem("apiKey"),
                "iduser": localStorage.getItem("id")
            }
        })
        .then(r => r.json())
        .then((datos) => {
            if (datos.codigo === 200) {
                toast.success("Evento eliminado exitosamente!");
                const nuevoListado = listado.filter(evento => evento.id !== idEvento);
                dispatch(guardarListado(nuevoListado));
            } else {
                toast.error('Error al eliminar evento.');
            }
        })
        .catch(error => {
            toast.error(`Error de conexión: ${error.message}`);
        });
    }
    

    useEffect(() => {
        let eventosHoy = [];
        let eventosAnteriores = [];
        const hoy = new Date().toISOString().slice(0, 10);

        for (let i = 0; i < listado.length; i++) {
          const fechaEvento = new Date(listado[i].fecha).toISOString().slice(0, 10); 
    
          if (fechaEvento === hoy) {
            eventosHoy.push(listado[i]);
          } else if (fechaEvento < hoy) {
            eventosAnteriores.push(listado[i]);
          }
        }    

        setEventosDelDia(eventosHoy);
        setEventosDelDiaAnterior(eventosAnteriores);
    }, [listado]);

    const imageBaseURL = "https://babytracker.develotion.com/imgs/";

    return (
        <div className="container mt-4">
            <div className="mb-4">
                <h3>Listado del día</h3>
                <div className="list-group lista-desplazable">
                    {eventosDelDia.length > 0 ? (
                        eventosDelDia.map(evento => (
                            <div key={evento.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src={`${imageBaseURL}${devuelveImg(evento.idCategoria)}.png`} alt={evento.idCategoria} className="me-3" style={{ width: '40px', height: '40px' }} />
                                    <span>{evento.detalle}</span>
                                </div>
                                <button className="btn btn-danger btn-sm" onClick={() => eliminarEvento(evento.id)}>Eliminar</button>
                                </div>
                        ))
                    ) : (
                        <p>No hay eventos para hoy.</p>
                    )}
                </div>
            </div>

            <div>
                <h3>Listado de días anteriores</h3>
                <div className="list-group lista-desplazable">
                    {eventosDelDiaAnterior.length > 0 ? (
                        eventosDelDiaAnterior.map(evento => (
                            <div key={evento.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src={`${imageBaseURL}${devuelveImg(evento.idCategoria)}.png`} alt={evento.idCategoria} className="me-3" style={{ width: '40px', height: '40px' }} />
                                    <span>{evento.detalle}</span>
                                </div>
                                <button className="btn btn-danger btn-sm" onClick={() => eliminarEvento(evento.id)}>Eliminar</button>
                                </div>
                        ))
                    ) : (
                        <p>No hay eventos de días anteriores.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventoListas;
