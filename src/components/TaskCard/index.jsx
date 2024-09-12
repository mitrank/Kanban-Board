import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const TaskCard = ({ title = "", description = "",onClick=()=>{} }) => {
  return title && description ? (
    <div onClick={onClick}> 
      <Card sx={{ maxWidth: 345, marginTop: 1, marginBottom: 1 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  ) : null;
};

export default TaskCard;
