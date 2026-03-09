import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/task";

type Filter = "all" | "active" | "completed";

interface TaskState {
  tasks: Task[];
  filter: Filter;
}

const initialState: TaskState = {
  tasks: [],
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.unshift(action.payload);
    },
    editTask(state,action: PayloadAction<{ id: string; task: string; title?: string }>) {
      const item = state.tasks.find((t) => t.id === action.payload.id);

      if (item && !item.completed) {
        item.task = action.payload.task;
        item.title = action.payload.title;
      }

    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find(t => t.id === action.payload);

      if (task) {
        task.completed = !task.completed;

        if (task.completed) {
          task.dateCompleted = new Date().toISOString();
        } else {
          task.dateCompleted = null;
        }
      }
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },

    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setFilter, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
