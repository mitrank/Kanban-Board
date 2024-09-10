import taskListReducer from './features/taskList/taskListSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    taskList : taskListReducer, 
  },
})