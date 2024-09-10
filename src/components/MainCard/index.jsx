import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from "@mui/material";
import TaskCard from "../TaskCard";  // Your TaskCard component
import AddIcon from "@mui/icons-material/Add";

const MainCard = ({ title }) => {
  const [titleColor, setTitlecolor] = useState("green");
  const [openDialog, setOpenDialog] = useState(false); // To handle the dialog visibility
  const [newTaskTitle, setNewTaskTitle] = useState(""); // Store new task title
  const [newTaskDescription, setNewTaskDescription] = useState(""); // Store new task description
  const [tasks, setTasks] = useState([]); // Store all tasks

  useEffect(() => {
    if (title === "Todos") {
      setTitlecolor("brown");
    } else if (title === "In Progress") {
      setTitlecolor("yellow");
    } else if (title === "Peer Review") {
      setTitlecolor("orange");
    } else if (title === "Done") {
      setTitlecolor("green");
    }
  }, [title]);

  // Handle opening the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewTaskTitle(""); // Reset input
    setNewTaskDescription(""); // Reset input
  };

  // Handle creating a new task
  const handleCreateTask = () => {
    if (newTaskTitle && newTaskDescription) {
      setTasks([...tasks, { title: newTaskTitle, description: newTaskDescription }]); // Add new task to the list
      handleCloseDialog(); // Close the dialog
    }
  };

  const handleOnClickTaskCard = () => {
    setOpenDialog(true)
  };

  return (
    <div style={{ position: "relative", width: 345, height: 600 }}>
      <Card sx={{ width: 345, height: 600 }}>
        <CardContent>
          <Typography
            className="text-center"
            bgcolor={titleColor}
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Divider />
          <div>
            {/* Render each task using TaskCard */}
            {tasks.map((task, index) => (
              <TaskCard key={index} title={task.title} description={task.description} onClick={handleOnClickTaskCard}/>
            ))}
          </div>
        </CardContent>
      </Card>

      {title === "Todos" ? (
        <>
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "absolute", bottom: 16, right: 16 }}
            onClick={handleOpenDialog}
          >
            <AddIcon />
          </Fab>

          {/* Dialog for adding a new task */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
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
        </>
      ) : null}
    </div>
  );
};

export default MainCard;
