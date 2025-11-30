import { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import apiClient from "../api/apiClient";
import type { Task } from "../types/task";
import { useNavigate, useParams } from "react-router-dom";
import TaskTable from "../components/taskTable";
import { jwtDecode } from "jwt-decode";
const token = sessionStorage.getItem("token") || "a.b.c";
  const user_id = (jwtDecode(token) as { id: number }).id;

const ProjectPage = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    apiClient
      .get(`/tasks/project/${Number(id)}`)
      .then((response) => setTasks(response.data))
      .catch((result) => console.error(result));
  }, [id]);

  const taskStatuses = ["todo", "inprogress", "completed"];

  const deleteProject = () => {
    apiClient
      .delete(`/projects/${id}`)
      .then((res) => {
        console.log(res.status);
        navigate(`/home/${user_id}`); 
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <h1>Feladatok</h1>
      <Button onClick={() => navigate(`/project/${Number(id)}/add-task`)}>Feladat hozzáadása</Button>
      <Button onClick={() => deleteProject}>Project törlése</Button>

      <Tabs defaultActiveKey="todo" id="task-status-tabs" className="mb-3">
        {taskStatuses.map((status) => {
          const filteredTasks = tasks.filter((task) => task.status === status);

          return (
            <Tab
              key={status}
              eventKey={status}
              title={status.charAt(0).toUpperCase() + status.slice(1)}
            >
              <TaskTable tasks={filteredTasks} />
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};

export default ProjectPage;
