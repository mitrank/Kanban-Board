import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider, Fab } from "@mui/material";
import TaskCard from "../TaskCard";
import AddIcon from "@mui/icons-material/Add";
import TaskDialog from "../TaskDialog";
import { useSelector } from "react-redux";

const MainCard = (props) => {
  const [titleColor, setTitlecolor] = useState("green");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCardData, setCurrentCardData] = useState(null);
  const existingTaskList = useSelector((state) => state.taskList.existingTaskList);

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

  const handleOnClickTaskCard = (task) => {
    setCurrentCardData(task);
    setOpenDialog(true);
  };

  const handleOpenDialog = () => {
    setCurrentCardData(null);
    setOpenDialog(true);
  };

  const filteredTasks = existingTaskList.filter(
    (task) => task.status === (props.title === "Todos" ? "todo" : props.title.toLowerCase())
  );

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
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.title}
                title={task.title}
                description={task.description}
                onClick={() => handleOnClickTaskCard(task)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {props.title === "Todos" ? (
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "absolute", bottom: 16, right: 16 }}
          onClick={handleOpenDialog}
        >
          <AddIcon />
        </Fab>
      ) : null}

      {openDialog && (
        <TaskDialog
          isOpenDialog={openDialog}
          setIsOpenDialog={setOpenDialog}
          currentCardData={currentCardData}
        />
      )}
    </div>
  );
};

export default MainCard;
