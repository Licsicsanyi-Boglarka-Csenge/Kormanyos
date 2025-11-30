import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "../types/task";

const AddTask = () => {
  const navigate = useNavigate();
  const { name, id } = useParams();
  const [validated, setValidated] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>();

  const onSubmit = (event: React.FormEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    apiClient
      .post("/users/search", { email })
      .then((res) => {
        if (res.data) {
          if (res.data.id) {
            const task: Task = {
              project_id: Number(id),
              assignee_id: Number(res.data.id),
              title,
              description,
              status: "todo",
              due_date: dueDate,
            };

            apiClient
              .post("/tasks", task)
              .then((res) => {
                alert(res.status);
              })
              .catch((error) => {
                console.error(error);
                alert("Hiba történt a feladat hozzáadása során.");
              });
          }
        } else {
          alert("Nem található ilyen felhasználó!");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Hiba történt a felhasználó keresése során.");
      });
  };

  return (
    <>
      <h1>Feladat hozzáadása</h1>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Cim</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Írja be a feladat címét"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={validated && !title}
            />
            <Form.Control.Feedback type="invalid">
              Nem lehet üres a mező!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>Feladat elvégzőjének email címe</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Írja be a feladat elvégzőjének email címét"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={validated && !email}
            />
            <Form.Control.Feedback type="invalid">
              Nem lehet üres a mező!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Határidő</Form.Label>
            <Form.Control
              required
              type="date"
              onChange={(e) => setDueDate(new Date(e.target.value))}
              isInvalid={validated && !dueDate}
            />
            <Form.Control.Feedback type="invalid">
              Nem lehet üres a mező!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="12"
            className="h-80"
            controlId="validationCustom04"
          >
            <Form.Label>Leírás</Form.Label>
            <Form.Control
              as="textarea"
              required
              placeholder="Írja be a feladat leírását"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={validated && !description}
            />
            <Form.Control.Feedback type="invalid">
              Nem lehet üres a mező!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Feladat hozzáadása</Button>
        <Button onClick={() => navigate(`/project/${name}/${id}`)}>
          Vissza a projekthez
        </Button>
      </Form>
    </>
  );
};

export default AddTask;
