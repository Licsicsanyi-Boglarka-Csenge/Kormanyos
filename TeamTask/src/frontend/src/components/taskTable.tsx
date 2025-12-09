import { Table } from "react-bootstrap";
import type { Task } from "../types/task";
import { useNavigate } from "react-router-dom";
import "./taskTable.css";

const TaskTable = ({ tasks }: { tasks: Task[] }) => {
  const navigate = useNavigate();
  const now = new Date();

  const sortedTasks = [...tasks].sort((a, b) => {
    const dueA = a.due_date ? new Date(a.due_date).getTime() : Infinity;
    const dueB = b.due_date ? new Date(b.due_date).getTime() : Infinity;

    const aOverdue = dueA < now.getTime();
    const bOverdue = dueB < now.getTime();

    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;

    return dueA - dueB;
  });

  return (
    <Table hover>
      <thead>
        <tr>
          <th>Cím</th>
          <th>Leírás</th>
          <th>Határidő</th>
        </tr>
      </thead>
      <tbody>
        {sortedTasks.length === 0 ? (
          <tr>
            <td colSpan={3}>Nincs megjeleníthető feladat!</td>
          </tr>
        ) : (
          sortedTasks.map((t) => {
            const dueDate = t.due_date ? new Date(t.due_date) : null;
            const isOverdue = dueDate
              ? dueDate.getTime() < now.getTime()
              : false;

            return (
              <tr
                key={t.id}
                onClick={() => navigate(`/project/task/${Number(t.id)}`)}
                className={`${isOverdue ? "overdue" : ""} ${t.status == "completed" ? "completed" : ""}`}
              >
                <td>{t.title}</td>
                <td>
                  {t.description.length > 15
                    ? t.description.slice(0, 14) + "..."
                    : t.description}
                </td>
                <td>{dueDate ? dueDate.toLocaleDateString() : ""}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
};
export default TaskTable;
