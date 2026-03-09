export type Task = {
  id: string;
  task: string;
  title?: string;
  completed: boolean;
  dateAdded: string;
  dateCompleted?: string | null;
};
