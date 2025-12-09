import { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import apiClient from "../api/apiClient";
import type { Task } from "../types/task";
import { useNavigate, useParams } from "react-router-dom";
import TaskTable from "../components/taskTable";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
const token = sessionStorage.getItem("token") || "";
const user_id = token ? (jwtDecode(token) as { id: number }).id : 0;

const ProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    apiClient
      .get(`/tasks/project/${Number(id)}`)
      .then((response) => setTasks(response.data))
      .catch(() => toast.error("Hiba történt a feladatok betöltése során."));
  }, [id]);

  const taskStatuses = ["todo", "inprogress", "completed"];

  const deleteProject = () => {
    apiClient
      .delete(`/projects/${id}`)
      .then(() => {
        toast.success("A projectet sikeresen törölted!")
        navigate(`/home/${user_id}`);
      })
      .catch(() => toast.error("Hiba történt a project törlése során."));
      
  };

  return (
    <>
      <h1>Feladatok</h1>
      <Button className="button mx-auto my-3" onClick={() => navigate(`/project/${Number(id)}/add-task`)}>
        Feladat hozzáadása
      </Button>

      <Tabs defaultActiveKey="todo" id="task-status-tabs">
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
      <Button className="button mx-auto my-3" onClick={deleteProject}>Project törlése</Button>
    </>
  );
};

export default ProjectPage;
