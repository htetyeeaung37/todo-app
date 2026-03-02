import { useState } from "react";

import { IconButton, ListItem, ListItemText, TextField } from "@mui/material";

import {
  Delete as DeleteIcon,
  SquareOutlined as CheckIcon,
  Edit as EditIcon,
  Check as DoneIcon,
} from "@mui/icons-material";

const Item = ({ task, remove, edit, toggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleSave = () => {
    edit(task.id, title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <ListItem
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <IconButton sx={{ mr: 2 }} onClick={() => toggle(task.id)}>
        {task.done ? <DoneIcon color="success" /> : <CheckIcon />}
      </IconButton>

      {isEditing ? (
        <>
          <TextField
            size="small"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ mr: 2 }}
            autoFocus
          />
          <IconButton onClick={handleSave}>
            <DoneIcon color="success" />
          </IconButton>
        </>
      ) : (
        <>
          <ListItemText primary={task.title} />
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon color="primary" />
          </IconButton>
        </>
      )}

      <IconButton onClick={() => remove(task.id)}>
        <DeleteIcon color="error" />
      </IconButton>
    </ListItem>
  );
};

export default Item;
