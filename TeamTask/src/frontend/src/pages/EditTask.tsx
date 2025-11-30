import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "../types/task";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState<boolean>(false);
  const [assigneeId, setAssigneeId] = useState<number>();
  const [projectId, setProjectId] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    apiClient.get(`/tasks/${Number(id)}`).then((res) => {
      setProjectId(res.data.project_id);
      setAssigneeId(res.data.assignee_id);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setStatus(res.data.status);
      setDueDate(new Date(res.data.due_date));
    });
  }, [id]);

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
        if (res.data && res.data.id) {
          const task: Task = {
            project_id: Number(projectId),
            assignee_id: Number(res.data.id),
            title,
            description,
            status,
            due_date: dueDate,
          };

          apiClient
            .put(`/tasks/${id}`, task)
            .then((res) => {
              alert(res.status);
              navigate(`/project/${projectId}`);
            })
            .catch((error) => {
              console.error(error);
              alert("Hiba történt a feladat frissítése során.");
            });
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
      <h1>Feladat módósítása</h1>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Cím</Form.Label>
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
          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="inprogress">In progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Határidő</Form.Label>
            <Form.Control
              required
              type="date"
              value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
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

        <Button type="submit">Feladat módósítása</Button>
        <Button onClick={() => navigate(`/project/${projectId}`)}>
          Vissza a projekthez
        </Button>
      </Form>
    </>
  );
};

export default EditTask;
