import React, { useRef, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';
//oficial
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [estaDesabilitadoL, setEstaDesabilitadoL] = useState(true);
  const username = useRef(null);
  const contrasena = useRef(null);

  const habilitarButtonL = () => {
    const usernameValue = username.current.value.trim();
    const contrasenaValue = contrasena.current.value.trim();

    if (usernameValue && contrasenaValue) {
      setEstaDesabilitadoL(false);
    } else {
      setEstaDesabilitadoL(true);
    }
  };

  const devuelveDatos = () => {
    fetch("https://babytracker.develotion.com/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: username.current.value,
        password: contrasena.current.value
      }),
    })
      .then(response => response.json())
      .then(datos => {
        if (datos.codigo === 200) {
          localStorage.setItem("apiKey", datos.apiKey);
          localStorage.setItem("id", datos.id);
          toast.success("¡Registro exitoso!");
          username.current.value = "";
          contrasena.current.value = "";
          login(); // acá estoy marcando el usuario como autenticado
          navigate("/dashboard");
        } else {
          toast.error(datos.mensaje);
        }
      })
      .catch(error => {
        toast.error("Error en la solicitud: " + error.message);
      });
  };

  return (
    <Container>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <Card className="bg-glass shadow mb-5">
            <Card.Body className="p-4">
              <h1 className="display-6 fw-bold text-center text-black mb-4">¡Bienvenido de nuevo!</h1>
              <p className="text-center text-black mb-4">Por favor, ingresa tu nombre de usuario y contraseña para acceder a tu cuenta.</p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="email" ref={username} onChange={habilitarButtonL} placeholder="Username" />
                  <Form.Label>Username</Form.Label>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control type="password" ref={contrasena} onChange={habilitarButtonL} placeholder="Contraseña" />
                  <Form.Label>Contraseña</Form.Label>
                </Form.Group>
                <div className="d-grid mb-3">
                  <Button disabled={estaDesabilitadoL} size="lg" onClick={devuelveDatos} type="button">Iniciar sesión ahora</Button>
                </div>
                <p className="text-center text-black small">¿No tienes una cuenta aún? <a href="/registro" className="text-primary">Regístrate</a></p>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Login;
