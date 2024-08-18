import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const InformeListas = () => {
    const listado = useSelector(state => state.evento.listado);
    const [totalBiberones, setTotalBiberones] = useState(0);
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState('Calculando...');
    const [totalPanales, setTotalPanales] = useState(0);
    const [tiempoTranscurridoPanales, setTiempoTranscurridoPanales] = useState('Calculando...');


    useEffect(() => {
        const calcularTiempo = () => {
            const hoy = new Date().toLocaleDateString();
            
            setTotalBiberones(
                listado.filter(elemento =>
                    elemento.idCategoria === 35 &&
                    new Date(elemento.fecha).toLocaleDateString() === hoy
                ).length
            );
    
            setTotalPanales(
                listado.filter(elemento =>
                    elemento.idCategoria === 33 &&
                    new Date(elemento.fecha).toLocaleDateString() === hoy
                ).length
            );
    
            if (listado.length > 0) {
                const eventosFiltrados = listado.filter(elemento =>
                    elemento.idCategoria === 35
                );
    
                if (eventosFiltrados.length > 0) {
                    eventosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
                    const ultimoEvento = new Date(eventosFiltrados[0].fecha);
                    const ahora = new Date();
                    const diferencia = ahora - ultimoEvento;
    
                    const horas = Math.floor(diferencia / (1000 * 60 * 60));
                    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    
                    setTiempoTranscurrido(`${horas} horas y ${minutos} minutos`);
                } else {
                    setTiempoTranscurrido('No hay eventos registrados.');
                }
            } else {
                setTiempoTranscurrido('No hay eventos registrados.');
            }
    
            if (listado.length > 0) {
                const eventosFiltradosPanales = listado.filter(elemento =>
                    elemento.idCategoria === 33
                );
    
                if (eventosFiltradosPanales.length > 0) {
                    eventosFiltradosPanales.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                    
                    const ultimoEventoP = new Date(eventosFiltradosPanales[0].fecha);
                    const ahora = new Date();
                    const diferenciaP = ahora - ultimoEventoP;
    
                    const horasP = Math.floor(diferenciaP / (1000 * 60 * 60));
                    const minutosP = Math.floor((diferenciaP % (1000 * 60 * 60)) / (1000 * 60));
                    
                    setTiempoTranscurridoPanales(`${horasP} horas y ${minutosP} minutos`);
                } else {
                    setTiempoTranscurridoPanales('No hay informes registrados.');
                }
            } else {
                setTiempoTranscurridoPanales('No hay informes registrados.');
            }
        };
    
        calcularTiempo();
    
        const intervalo = setInterval(calcularTiempo, 60000);
    
        return () => clearInterval(intervalo);
    }, [listado]);
    

return (
    <Container className="mt-4">
        <Row>
            <Col>
                <h2 className="mb-4 text-center">Informe de Eventos</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <Card className="mb-4 p-3 shadow-sm">
                    <Card.Body>
                        <Card.Title>Total de Biberones</Card.Title>
                        <Card.Text className="display-4">
                            {totalBiberones}
                        </Card.Text>
                    </Card.Body>
                    <hr />
                    <Card.Body>
                        <Card.Title>Tiempo Transcurrido</Card.Title>
                        <Card.Text className="display-4">
                            {tiempoTranscurrido}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="mb-4 p-3 shadow-sm">
                    <Card.Body>
                        <Card.Title>Total de Pañales</Card.Title>
                        <Card.Text className="display-4">
                            {totalPanales}
                        </Card.Text>
                    </Card.Body>
                    <hr />
                    <Card.Body>
                        <Card.Title>Tiempo Transcurrido Pañales</Card.Title>
                        <Card.Text className="display-4">
                            {tiempoTranscurridoPanales}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
);
};

export default InformeListas;

