import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AgregaEvento from "./AgregaEvento";
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch} from "react-redux"
import EventoListas from "./EventoListas";
import InformeListas from "./InformeListas";
import AnalisisCantPorCategoria from "./AnalisisCantPorCategoria";

import { guardarListado} from '../features/eventoSlice';
import AnalisisCantComidaUltimaSemana from "./AnalisisCantComidaUltimaSemana";
import ProximoBiberon from "./ProximoBiberon";



const DashBoard = () => {

  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("apiKey") === null) {
      navigate("/");
    } else {
      fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${localStorage.getItem("id")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "apikey": localStorage.getItem("apiKey"),
          "iduser": localStorage.getItem("id")
        },
      })
        .then(r => r.json())
        .then(datos => {
          dispatch(guardarListado(datos.eventos));
        });
    }
  }, []);



  return (
    <Container fluid className="mt-4">
      <Row className="g-4">
        <Col md={7} lg={5}>
          <AgregaEvento />
        </Col>
        <Col md={4} lg={3}>
    
          <EventoListas />
          <hr/>
          <AnalisisCantPorCategoria />
          <hr/>
          <AnalisisCantComidaUltimaSemana />
        </Col>

        <Col md={4} lg={3}>
          <InformeListas />  
          <hr/> 
          <ProximoBiberon />
        </Col>

      </Row>
    </Container>
  );
}

export default DashBoard;
