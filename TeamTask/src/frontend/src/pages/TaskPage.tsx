import { useEffect, useState } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "../types/task";
import type { User } from "../types/user";
import type { Project } from "../types/project";
import { jwtDecode } from "jwt-decode";
import "./TaskPage.css";

const TaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectId, setProjectId] = useState<number>();
  const [assigneeId, setAssigneeId] = useState<number>();
  const [assigneeName, setAssigneeName] = useState<string>();
  const [assigneeEmail, setAssigneeEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>();
  const [owner, setOwner] = useState<User>();
  const [project, setProject] = useState<Project>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  const token = sessionStorage.getItem("token") || "";
  const user_id = (jwtDecode(token) as { id: number }).id || 0;

  useEffect(() => {
    apiClient.get(`/tasks/${Number(id)}`).then((res) => {
      setProjectId(Number(res.data.project_id));
      setAssigneeId(Number(res.data.assignee_id));
      setTitle(res.data.title);
      setDescription(res.data.description);
      setStatus(res.data.status);
      setDueDate(res.data.due_date ? new Date(res.data.due_date) : undefined);
    });
  }, [id]);

  useEffect(() => {
    if (assigneeId) {
      apiClient
        .get(`/users/${assigneeId}`)
        .then((res) => {
          setAssigneeName(res.data.name);
          setAssigneeEmail(res.data.email);
        })
        .catch((err) => console.error("Assignee load error:", err));
    }
  }, [assigneeId]);

  useEffect(() => {
    if (projectId) {
      apiClient
        .get(`/projects/${projectId}`)
        .then((res) => setProject(res.data))
        .catch((err) => console.error("Project load error:", err));
    }
  }, [projectId]);

  useEffect(() => {
    if (project?.owner_id) {
      apiClient
        .get(`/users/${project.owner_id}`)
        .then((res) => {
          setOwner(res.data);
          if (project.owner_id === user_id) setEditMode(true);
        })
        .catch((err) => console.error("Owner load error:", err));
    }
  }, [project?.owner_id]);

  const inputStyle = editMode
    ? {}
    : {
        border: "none",
        boxShadow: "none",
        outline: "none",
        backgroundColor: "white",
        pointerEvents: "none" as const,
      };

  useEffect(() => {
    if (status) {
      apiClient.patch(`/tasks/${id}`, { status: status }).catch((err) => {
        console.error("Error updating status:", err);
        alert("Hiba történt a státusz frissítése során!");
      });
    }
  }, [status]);

  const editTask = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (
      !assigneeEmail ||
      !projectId ||
      !title ||
      !description ||
      !status ||
      !dueDate
    ) {
      alert("Minden mező kitöltése kötelező!");
      return;
    }

    apiClient
      .post("/users/search", { email: assigneeEmail })
      .then((res) => {
        if (!res.data?.id) {
          alert("Nem található ilyen felhasználó!");
          return;
        }

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
          .then(() => {
            alert("Feladat sikeresen frissítve.");
            navigate(0);
          })
          .catch((err) => {
            console.error("Task update error:", err);
            alert(
              `Hiba történt a feladat frissítése során: ${
                err.response?.data?.message || "Ismeretlen hiba"
              }`
            );
          });
      })
      .catch((err) => {
        console.error("User search error:", err);
        alert("Hiba történt a felhasználó keresése során.");
      });
  };

  const deleteTask = () => {
    apiClient
      .delete(`/tasks/${id}`)
      .then((res) => {
        alert(res.status);
        navigate(`/project/${projectId}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Row>
          <Form
            noValidate
            validated={validated}
            onSubmit={editTask}
          >
            <Table className="mt-2">
              <thead>
                <tr>
                  <th>Projekt neve</th>
                  <td colSpan={2}>{project?.name}</td>
                </tr>
                <tr>
                  <th>Project vezetője</th>
                  <td>{owner?.name}</td>
                  <td>{owner?.email}</td>
                </tr>
                <tr>
                  <th>Feladat elvégzője</th>
                  <td>{assigneeName}</td>
                  <td>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center", ...inputStyle }}
                      value={assigneeEmail}
                      onChange={(e) => setAssigneeEmail(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Státusz</th>
                  <td colSpan={2}>
                    <Form.Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="todo">Todo</option>
                      <option value="inprogress">In progress</option>
                      <option value="completed">Completed</option>
                    </Form.Select>
                  </td>
                </tr>
                <tr>
                  <th>Határidő</th>
                  <td colSpan={2}>
                    <Form.Control
                      type="date"
                      style={{ ...inputStyle }}
                      value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
                      onChange={(e) => setDueDate(new Date(e.target.value))}
                    />
                  </td>
                </tr>
              </thead>
            </Table>

            <Table className="mt-4">
              <tbody>
                <tr>
                  <th colSpan={3}>
                    <h1>
                      <Form.Control
                        type="text"
                        style={{ fontWeight: "bold", ...inputStyle }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </h1>
                  </th>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <Form.Control
                      id="textarea"
                      as="textarea"
                      style={{ ...inputStyle }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
      </Row>

      <Row className="g-3">
        <Col sx="auto">
          <Button onClick={() => navigate(-1)} className="button task-button w-100 ">
            Vissza
          </Button>
        </Col>

        {owner?.id === user_id && (
          <>
            <Col sx="auto">
              <Button className="button task-button w-100 " onClick={editTask}>
                Feladat módosítása
              </Button>
            </Col>

            <Col sx="auto">
              <Button className="button task-button w-100" onClick={deleteTask}>
                Feladat törlése
              </Button>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default TaskPage;
