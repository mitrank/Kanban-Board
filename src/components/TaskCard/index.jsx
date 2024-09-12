import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@mui/material";

const TaskCard = ({
  title = "",
  description = "",
  id = "",
  onClick = () => {},
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return title && description ? (
    <div className="flex flex-row gap-2 mt-2 mb-2">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="w-full">
        <Card sx={{ maxWidth: 345}}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {description.length > 20 ? (
                  description.substring(0, 25) + "..."
                ) : description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <Button onClick={onClick} variant="outlined" size="small" color="primary">
        View
      </Button>
    </div>
  ) : null;
};

export default TaskCard;
