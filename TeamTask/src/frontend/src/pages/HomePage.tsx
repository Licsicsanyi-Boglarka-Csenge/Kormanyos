import { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import apiClient from "../api/apiClient";
import type { Task } from "../types/task";
import { useParams } from "react-router-dom";
import TaskTable from "../components/taskTable";

const ProjectPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    apiClient
      .get(`/tasks/assignee/${Number(id)}`)
      .then((response) => setTasks(response.data))
      .catch((result) => console.error(result));
  }, [id]);

  const taskStatuses = ["todo", "inprogress", "completed"];

  return (
    <>
      <h1>Feladataim</h1>

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
