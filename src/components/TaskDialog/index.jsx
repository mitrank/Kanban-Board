import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTaskList, updateTaskList, removeTaskList } from "../../features/taskList/taskListSlice";

const TaskDialog = (props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.currentCardData) {
      setNewTaskTitle(props.currentCardData.title || "");
      setNewTaskDescription(props.currentCardData.description || "");
    }
  }, [props.currentCardData]);

  const handleCloseDialog = () => {
    props.setIsOpenDialog(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleSaveChanges = () => {
    if (newTaskTitle && newTaskDescription) {
      const updatedTask = {
        ...props.currentCardData,
        title: newTaskTitle,
        description: newTaskDescription,
      };
      dispatch(updateTaskList(updatedTask));
      handleCloseDialog();
    }
  };

  const handleDeleteTask = () => {
    dispatch(removeTaskList(props.currentCardData));
    handleCloseDialog();
  };

  const handleCreateTask = () => {
    if (newTaskTitle && newTaskDescription) {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        id: newTaskTitle.split(' ').join('').toLowerCase(),
        status: "todo",
      };
      dispatch(addTaskList(newTask));
      handleCloseDialog();
    }
  };

  return (
    <Dialog open={props.isOpenDialog} onClose={handleCloseDialog}>
      <DialogTitle>{props.currentCardData ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent>
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
        {props.currentCardData ? (
          <>
            <Button onClick={handleSaveChanges} color="primary">
              Save
            </Button>
            <Button onClick={handleDeleteTask} color="secondary">
              Delete
            </Button>
          </>
        ) : (
          <Button onClick={handleCreateTask} color="primary">
            Create
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
