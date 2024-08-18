// src/Components/Registro.js
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Container, Card, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';

const Registro = () => {
  const navigate = useNavigate(); 
  const { login } = useAuth();

  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [estaDesabilitadoR, setEstaDesabilitadoR] = useState(true);

  const usernameR = useRef(null);
  const contrasenaR = useRef(null);
  const departamentoR = useRef(null);
  const ciudadR = useRef(null);

  const habilitarButtonR = () => {
    if (
      usernameR.current.value &&
      contrasenaR.current.value &&
      departamentoR.current.value !== "slcDpto" &&
      ciudadR.current.value !== "slcCiud"
    ) {
      setEstaDesabilitadoR(false);
    } else {
      setEstaDesabilitadoR(true);
    }
  };

  useEffect(() => {
    fetch("https://babytracker.develotion.com/departamentos.php")
      .then((response) => response.json())
      .then((datos) => {
        setDepartamentos(datos.departamentos);
      })
      .catch((error) => {
        toast.error('Error al cargar departamentos');
      });
  }, []);

  const mostrarCiudades = () => {
    const departamentoId = departamentoR.current.value;
    if (departamentoId !== "slcDpto") {
      fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${departamentoId}`)
        .then((response) => response.json())
        .then((datos) => {
          setCiudades(datos.ciudades);
          habilitarButtonR();
        })
        .catch((error) => {
          toast.error('Error al cargar ciudades');
        });
    } else {
      setCiudades([]);
    }
  };

  const registrarUser = () => {
    fetch("https://babytracker.develotion.com/usuarios.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: usernameR.current.value,
        password: contrasenaR.current.value,
        IdDepartamento: departamentoR.current.value,
        idCiudad: ciudadR.current.value,
      }),
    })
      .then((response) => response.json())
      .then((datos) => {
        if (datos.codigo === 200) {
          localStorage.setItem("apiKey", datos.apiKey);
          localStorage.setItem("id", datos.id);
          login(); 
          toast.success("¡Registro exitoso!");
          setTimeout(() => {
            navigate("/dashboard"); 
          }, 1000);
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
              <h1 className="display-6 fw-bold text-center text-black mb-4">¡Crea una cuenta!</h1>
              <p className="text-center text-black mb-4">Por favor, completa los campos para crear una nueva cuenta.</p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    ref={usernameR} 
                    onChange={habilitarButtonR} 
                    placeholder="Username" 
                  />
                  <Form.Label>Username</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="password" 
                    ref={contrasenaR} 
                    onChange={habilitarButtonR} 
                    placeholder="Contraseña" 
                  />
                  <Form.Label>Contraseña</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select ref={departamentoR} onChange={mostrarCiudades}>
                    <option value="slcDpto">Seleccione Departamento</option>
                    {departamentos.map((dpto) => (
                      <option key={dpto.id} value={dpto.id}>{dpto.nombre}</option>
                    ))}
                  </Form.Select>
                  <Form.Label>Departamento</Form.Label>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Select ref={ciudadR} onChange={habilitarButtonR}>
                    <option value="slcCiud">Seleccione Ciudad</option>
                    {ciudades.map((ciud) => (
                      <option key={ciud.id} value={ciud.id}>{ciud.nombre}</option>
                    ))}
                  </Form.Select>
                  <Form.Label>Ciudad</Form.Label>
                </Form.Group>
                <div className="d-grid mb-3">
                  <Button 
                    variant="primary" 
                    disabled={estaDesabilitadoR} 
                    size="lg" 
                    onClick={registrarUser} 
                    type="button"
                  >
                    Registrarse
                  </Button>
                </div>
                <p className="text-center text-black small">¿Ya tienes una cuenta? <a href="/login" className="text-primary">Inicia sesión</a></p>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Registro;
