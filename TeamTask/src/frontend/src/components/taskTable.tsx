import { Table } from "react-bootstrap";
import type { Task } from "../types/task";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const TaskTable = ({ tasks }: { tasks: Task[] }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => console.log(id));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Cím</th>
          <th>Leírás</th>
          <th>Határidő</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan={3}>Nincs megjeleníthető feladat!</td>
          </tr>
        ) : (
          tasks.map((t) => (
            <tr
              key={t.id}
              onClick={() => navigate(`/project/task/${Number(t.id)}`)}
            >
              <td>{t.title}</td>
              <td>
                {t.description.length > 15
                  ? t.description.slice(0, 14) + "..."
                  : t.description}
              </td>
              <td>{new Date(String(t.due_date)).toLocaleDateString()}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
export default TaskTable;
