import { useRef, useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { guardarListado, guardarCategorias } from '../features/eventoSlice';

const AgregaEvento = () => {
  const dispatch = useDispatch();
  const [categorias, setCategorias] = useState([]);
  const [estaDesabilitado, setEstaDesabilitado] = useState(true);

  // Formato ISO 8601 para data e hora (YYYY-MM-DDTHH:MM)
  const fechaHoraActual = new Date().toISOString().slice(0, 16);

  const categoriaRef = useRef(null);
  const fechaHoraRef = useRef(null);
  const detallesRef = useRef(null);

  useEffect(() => {
    fetch("https://babytracker.develotion.com/categorias.php", {
      method: "GET",
      headers: {
        "apikey": localStorage.getItem("apiKey"),
        "iduser": localStorage.getItem("id")
      }
    })
      .then((response) => response.json())
      .then((datos) => {
        dispatch(guardarCategorias(datos.categorias));
        if (Array.isArray(datos.categorias)) {
          setCategorias(datos.categorias);
        } else {
          toast.error('Formato de datos incorrecto');
        }
      })
      .catch((error) => {
        toast.error('Error al cargar categorías');
      });
  }, [dispatch]);

  const habilitarButton = () => {
    const fechaHoraSeleccionada = fechaHoraRef.current.value;


    if (categoriaRef.current.value !== "slcCat" && (fechaHoraSeleccionada && fechaHoraSeleccionada <= fechaHoraActual)) {
        setEstaDesabilitado(false);
    } else {
      setEstaDesabilitado(true);
    }
  };

  const agregarEvento = () => {
    const fechaHoraSeleccionada = fechaHoraRef.current.value || fechaHoraActual;
    console.log('Fecha y Hora para Envio:', fechaHoraSeleccionada);

    fetch("https://babytracker.develotion.com/eventos.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": localStorage.getItem("apiKey"),
        "iduser": localStorage.getItem("id")
      },
      body: JSON.stringify({
        idCategoria: categoriaRef.current.value,
        idUsuario: localStorage.getItem("id"),
        detalle: detallesRef.current.value,
        fecha: fechaHoraSeleccionada,
      }),
    })
      .then((response) => response.json())
      .then((datos) => {
        if (datos.codigo === 200) {
          toast.success("Evento agregado exitosamente!");

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

        } else {
          toast.error(datos.mensaje);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <Card className="bg-glass shadow mb-5">
            <Card.Body className="p-4">
              <h1 className="display-6 fw-bold text-center text-black mb-4">Agregar Evento</h1>
              <p className="text-center text-black mb-4">Por favor, completa los campos para agregar un nuevo evento.</p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Select ref={categoriaRef} onChange={habilitarButton}>
                    <option value="slcCat">Seleccione Categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.tipo}</option>
                    ))}
                  </Form.Select>
                  <Form.Label>Categoría</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="datetime-local" 
                    ref={fechaHoraRef} 
                    onChange={habilitarButton} 
                    placeholder="Fecha y Hora" 
                  />
                  <Form.Label>Fecha y Hora</Form.Label>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    ref={detallesRef} 
                    onChange={habilitarButton} 
                    placeholder="Detalles (opcional)" 
                  />
                  <Form.Label>Detalles</Form.Label>
                </Form.Group>
                <div className="d-grid mb-3">
                  <Button 
                    variant="primary" 
                    disabled={estaDesabilitado} 
                    size="lg" 
                    onClick={agregarEvento} 
                    type="button"
                  >
                    Agregar Evento
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AgregaEvento;
