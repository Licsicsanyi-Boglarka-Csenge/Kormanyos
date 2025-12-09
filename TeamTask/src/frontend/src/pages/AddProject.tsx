import { useState } from "react";
import type { Project } from "../types/project";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Form, Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const NewProject = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const user_id = (jwtDecode(token!) as { id: number }).id;
  const [validated, setValidated] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onSubmit = (event: React.FormEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const p: Project = {
      name,
      description,
    };

    apiClient
      .post("/projects", p)
      .then(() => {
       toast.success("A projectet sikeresen hozzáadtad!")
        setName("");
        setDescription("");
        navigate(0);
      })
      .catch(() => toast.error("Hiba történt project hozzáadása során."));
  };

  return (
    <>
      <h1>Új projekt létrehozása</h1>
      <Form className="mt-3" noValidate validated={validated} onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Név</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Írja be a projekt nevét"
              onChange={(e) => setName(e.target.value)}
              isInvalid={validated && !name}
            />
            <Form.Control.Feedback type="invalid">
              Nem lehet üres a mező!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Leírás</Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder="Írja be a project leírását"
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={validated && !name}
            />
            <Form.Control.Feedback type="invalid">
              Nem lehet üres a mező!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button className="button mx-auto" type="submit">Projekt létrehozása</Button>
      </Form>
    </>
  );
};
export default NewProject;
