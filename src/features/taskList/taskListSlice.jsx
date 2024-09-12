import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState: {
    value: loadTasksFromLocalStorage(),
    existingTaskList: loadTasksFromLocalStorage(),
  },
  reducers: {
    addTaskList: (state, action) => {
      const updatedTasks = [...state.existingTaskList, action.payload];
      state.existingTaskList = updatedTasks;
      state.value = updatedTasks;
      saveTasksToLocalStorage(updatedTasks);
    },
    updateTaskList: (state, action) => {
      const updatedTasks = state.existingTaskList.map((task) =>
        task.title === action.payload.title ? action.payload : task
      );
      state.existingTaskList = updatedTasks;
      state.value = updatedTasks;
      saveTasksToLocalStorage(updatedTasks);
    },
    removeTaskList: (state, action) => {
      const updatedTasks = state.existingTaskList.filter(
        (task) => task.title !== action.payload.title
      );
      state.existingTaskList = updatedTasks;
      state.value = updatedTasks;
      saveTasksToLocalStorage(updatedTasks);
    },
  },
});

export const { addTaskList, updateTaskList, removeTaskList } = taskListSlice.actions;
export default taskListSlice.reducer;
