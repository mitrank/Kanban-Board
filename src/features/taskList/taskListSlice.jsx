import { createSlice } from "@reduxjs/toolkit";

export const taskListSlice = createSlice({
  name: "taskList",
  initialState: {
    value: [],
  },
  reducers: {
    addTaskList: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTaskList } = taskListSlice.actions;

export default taskListSlice.reducer;
