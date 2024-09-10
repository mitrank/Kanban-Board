import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider, Fab } from "@mui/material";
import TaskCard from "../TaskCard"; // Your TaskCard component
import AddIcon from "@mui/icons-material/Add";
import TaskDialog from "../TaskDialog";

const MainCard = (props) => {
  console.log(props);
  const [titleColor, setTitlecolor] = useState("green");
  const [openDialog, setOpenDialog] = useState(false); // To handle the dialog visibility

  const [newTasks, setNewTasks] = useState([]); // Store all newTasks

  useEffect(() => {
    if (props.title === "Todos") {
      setTitlecolor("brown");
    } else if (props.title === "In Progress") {
      setTitlecolor("yellow");
    } else if (props.title === "Peer Review") {
      setTitlecolor("orange");
    } else if (props.title === "Done") {
      setTitlecolor("green");
    }
  }, [props.title]);

  useEffect(() => {
    setNewTasks(props.taskList);
  }, [props.taskList]);

  const handleOnClickTaskCard = () => {
    setOpenDialog(true);
  };

  // Handle opening the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
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
            {props.title}
          </Typography>
          <Divider />
          <div>
            {/* Render each new task using TaskCard in todos only*/}
            {props.title === "Todos" &&
              newTasks.map((task, index) => (
                <TaskCard
                  key={index}
                  title={task.title}
                  description={task.description}
                  onClick={handleOnClickTaskCard}
                />
              ))}
          </div>
        </CardContent>
      </Card>

      {props.title === "Todos" ? (
        <>
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "absolute", bottom: 16, right: 16 }}
            onClick={handleOpenDialog}
          >
            <AddIcon />
          </Fab>
        </>
      ) : null}
      {openDialog && (
        <TaskDialog isOpenDialog={openDialog} setIsOpenDialog={setOpenDialog} />
      )}
    </div>
  );
};

export default MainCard;
