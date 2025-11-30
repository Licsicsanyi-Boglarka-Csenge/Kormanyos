import { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "../types/task";
import type { User } from "../types/user";
import type { Project } from "../types/project";
import { jwtDecode } from "jwt-decode";

const TaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectId, setProjectId] = useState<number>();
  const [assigneeId, setAssigneeId] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date>();
  const [assignee, setAssignee] = useState<User>();
  const [owner, setOwner] = useState<User>();
  const [project, setProject] = useState<Project>();
  const token = sessionStorage.getItem("token") || "a.b.c";
  const user_id = (jwtDecode(token) as { id: number }).id;

  useEffect(() => {
    apiClient.get(`/tasks/${Number(id)}`).then((res) => {
      setProjectId(Number(res.data.project_id));
      setAssigneeId(Number(res.data.assignee_id));
      setTitle(res.data.title);
      setDescription(res.data.description);
      setStatus(res.data.status);
      setDueDate(new Date(res.data.due_date));
    });
  }, [id]);

  useEffect(() => {
    if (assigneeId) {
      apiClient
        .get(`/users/${assigneeId}`)
        .then((res) => setAssignee(res.data))
        .catch((result) => console.error(result));
    }
  }, [assigneeId]);

  useEffect(() => {
    if (projectId) {
      apiClient
        .get(`/projects/${projectId}`)
        .then((res) => setProject(res.data))
        .catch((result) => console.error(result));
    }
  }, [projectId]);

  useEffect(() => {
    if (project?.owner_id) {
      apiClient
        .get(`/users/${project.owner_id}`)
        .then((res) => setOwner(res.data))
        .catch((result) => console.error(result));
    }
  }, [project?.owner_id]);

  const statusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);

    const t: Task = {
      project_id: Number(projectId),
      assignee_id: Number(assigneeId),
      title,
      description,
      status,
      due_date: dueDate,
    };
    apiClient
      .put(`/tasks/${id}`, t)
      .then((res) => alert(res.status))
      .catch((err) => console.error(err));
  };
  const deleteTask = () => {
    apiClient
      .delete(`/pizzak/${id}`)
      .then((res) => {
        alert(res.status);
        navigate(`project/${project?.id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Projekt neve</th>
            <td colSpan={2}>{project?.name}</td>
          </tr>
          <tr>
            <th>Project vezteztője</th>
            <td>{owner?.name}</td>
            <td>({owner?.email})</td>
          </tr>
          <tr>
            <th>Feladat elvégzője</th>
            <td>{assignee?.name}</td>
            <td>({assignee?.email})</td>
          </tr>
          <tr>
            <th>Státusz</th>
            <td colSpan={2}>
              <Form.Select
                aria-label="Default select example"
                value={status}
                onChange={statusChange}
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
              {new Date(String(dueDate)).toLocaleDateString()}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={3}>
              <h1>{title}</h1>
            </th>
          </tr>
          <tr>
            <td colSpan={3}>{description}</td>
          </tr>
        </tbody>
      </Table>
      <Button onClick={() => navigate(`/project${projectId}`)}>
        Vissza a projekthez
      </Button>
      {owner?.id === user_id ? (
        <>
          <Button
            onClick={() => navigate(`/project/task/${Number(id)}/edit-task`)}
          >
            Feladat módósítása
          </Button>

          <Button onClick={() => deleteTask}>Feladat törlése</Button>
        </>
      ) : null}
    </>
  );
};

export default TaskPage;
