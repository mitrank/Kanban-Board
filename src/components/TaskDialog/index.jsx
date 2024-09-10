import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTaskList } from "../../features/taskList/taskListSlice";

const TaskDialog = (props) => {
  const [newTaskTitle, setNewTaskTitle] = useState(""); // Store new task title
  const [newTaskDescription, setNewTaskDescription] = useState(""); // Store new task description
  const dispatch = useDispatch();

  // Handle closing the dialog
  const handleCloseDialog = () => {
    props.setIsOpenDialog(false);
    setNewTaskTitle(""); // Reset input
    setNewTaskDescription(""); // Reset input
  };

  // Handle creating a new task
  const handleCreateTask = () => {
    if (newTaskTitle && newTaskDescription) {
      //   setTasks([
      //     ...tasks,
      //     { title: newTaskTitle, description: newTaskDescription },
      //   ]); // Add new task to the list
      const finalTaskData = {};
      finalTaskData.title = newTaskTitle;
      finalTaskData.description = newTaskDescription;
      finalTaskData.isTaskCreated = true;
      finalTaskData.status = "todo";
      dispatch(addTaskList(finalTaskData));
      console.log(finalTaskData)
      handleCloseDialog(); // Close the dialog
    }
  };

  return (
    <Dialog open={props.isOpenDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the title and description for your new task.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          fullWidth
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Task Description"
          fullWidth
          multiline
          rows={4}
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleCreateTask} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
