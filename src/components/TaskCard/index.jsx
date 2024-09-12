import React, { useState } from "react";
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
  onDoubleClick = () => {},
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMouseDown = () => {
    setIsDragging(false); // Reset dragging state
  };

  const handleDragStart = () => {
    setIsDragging(true); // Set dragging state
  };

  const handleDoubleClick = (event) => {
    // Prevent drag if double-clicked
    event.stopPropagation();
    if (!isDragging) {
      onDoubleClick(); // Handle double click
    }
  };

  return title && description ? (
    <div
      className="mt-2 mb-2"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onDragStart={handleDragStart}
    >
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {description.length > 20
                  ? description.substring(0, 35) + "..."
                  : description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    </div>
  ) : null;
};

export default TaskCard;
