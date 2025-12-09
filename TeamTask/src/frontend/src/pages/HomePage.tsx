import { useEffect, useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import apiClient from "../api/apiClient";
import type { Task } from "../types/task";
import { useParams } from "react-router-dom";
import TaskTable from "../components/taskTable";
import { toast } from "react-toastify";

const ProjectPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    apiClient
      .get(`/tasks/assignee/${Number(id)}`)
      .then((response) => setTasks(response.data))
      .catch(() => toast.error("Hiba történt a feladatok betöltése során."));
  }, [id]);

  const taskStatuses = ["todo", "inprogress", "completed"];

  return (
    <>
      <Container className="ms-auto ml-auto">
        <h1 className="my-2">Feladataim</h1>

        <Tabs defaultActiveKey="todo">
          {taskStatuses.map((status) => {
            const filteredTasks = tasks.filter(
              (task) => task.status === status
            );

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
      </Container>
    </>
  );
};

export default ProjectPage;
