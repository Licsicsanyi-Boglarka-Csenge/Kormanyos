export type Task = {
  id?: number;
  project_id: number;
  assignee_id: number;
  title: string;
  description: string;
  status: string;
  due_date?: Date;
};
