import { useState } from "react";
import "./App.css";
import apiClient from "./api/apiClient";
import { useNavigate } from "react-router-dom";
import { emailValidation, passwordValidation } from "./components/validation";
import type { User } from "./types/user";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setEmailError(emailValidation(email));
    setPasswordError(passwordValidation(password));
    if (emailError || passwordError) {
      return;
    }

    const u: User = {
      email,
      password,
    };

    apiClient
      .post("/users/login", u)
      .then((response) => {
        const token = response.data.token;
        const user_id = response.data.user_id;
        if (!token || !user_id) {
          toast.error("Hiba történt a bejelentkezés során!");
          return;
        }
        sessionStorage.setItem("token", token);
        navigate(`/home/${Number(user_id)}`);
      })
      .catch(() => toast.error("Hiba történt a bejelentkezés során!"));
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Row className="me-3">
        <Button
          className="button reg-button w-100  mb-3"
          onClick={() => navigate("/register")}
        >
          Regisztráció
        </Button>
      </Row>

      <h1 className="mb-4 text-center">Bejelentkezés</h1>

      <Row>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Írja be az email címét"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(emailValidation(e.target.value));
            }}
            isInvalid={!!emailError}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3">
          <Form.Label>Jelszó</Form.Label>
          <Form.Control
            type="password"
            placeholder="Írja be a jelszót"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button type="submit" className="button mx-auto mt-3">
        Belépés
      </Button>
    </Form>
  );
}

export default App;
