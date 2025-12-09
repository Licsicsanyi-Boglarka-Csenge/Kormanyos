import { useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import type { User } from "../types/user";
import apiClient from "../api/apiClient";
import { emailValidation, passwordValidation } from "../components/validation";
import "./Register.css";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [validated, setValidated] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nameErr = !name ? "A név nem lehet üres!" : "";
    const emailErr = emailValidation(email);
    const passwordErr = passwordValidation(password, confirm);
    const confirmErr = !confirm ? "A jelszót meg kell ismételni!" : "";

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmError(confirmErr);

    if (nameErr || emailErr || passwordErr || confirmErr) return;
    const u: User = { name, email, password };

    apiClient
      .post("/users/register", u)
      .then(() => toast.success("A regisztráció sikeres volt!"))
      .catch(() => toast.error("Hiba történt a regisztráció során."));

    apiClient
      .post("/users/search", { email })
      .then((res) => navigate(`/home/${res.data.id}`))
      .catch(() => toast.error("Hiba történt az oldal betöltése közben."));
  };

  return (
      <Form
        noValidate
        validated={validated}
        onSubmit={onSubmit}
        className="register-form"
      >
        <Row className="me-3">
            <Button
              className="button reg-button w-100  mb-3"
              onClick={() => navigate("/")}
            >
              Bejelentkezés
            </Button>
        </Row>

        <h1 className="mb-4 text-center">Regisztráció</h1>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              placeholder="Írja be a nevét"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(!e.target.value ? "A név nem lehet üres!" : "");
              }}
              isInvalid={!!nameError}
            />
            <Form.Control.Feedback type="invalid">
              {nameError}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
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
                setPasswordError(passwordValidation(e.target.value, confirm));
              }}
              isInvalid={!!passwordError}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-4">
            <Form.Label>Jelszó ismétlése</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ismételje meg a jelszót"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setConfirmError(
                  !e.target.value ? "A jelszót meg kell ismételni!" : ""
                );
              }}
              isInvalid={!!confirmError}
            />
            <Form.Control.Feedback type="invalid">
              {confirmError}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" className="button reg-button mx-auto mt-3">
          Regisztráció
        </Button>
      </Form>
  );
};

export default Register;
