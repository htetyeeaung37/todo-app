import { useContext, useRef, useState } from "react";
import Item from "./Item";

import {
  AppBar,
  Badge,
  Container,
  Divider,
  IconButton,
  List,
  OutlinedInput,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import {
  Add as AddIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { AppContext } from "./AppProvider";

const App = () => {
  const inputRef = useRef();
  const theme = useTheme();

  const { mode, setMode } = useContext(AppContext);

  const [data, setData] = useState([
    { id: 1, title: "Cleaning House", done: true },
    { id: 2, title: "Reading Book", done: true },
    { id: 3, title: "Going To The Gym", done: false },
    { id: 4, title: "Go To School", done: true },
    { id: 5, title: "Homework", done: false },
  ]);

  // Toggle theme mode
  const handleToggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleAddBtn = () => {
    const title = inputRef.current.value.trim();
    if (!title) return;

    setData((prev) => [...prev, { id: Date.now(), title, done: false }]);

    inputRef.current.value = "";
  };

  const handleRemoveBtn = (id) => {
    setData((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditBtn = (id, newTitle) => {
    setData((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  };

  const toggle = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              Todo List
              <Badge
                badgeContent={data.filter((item) => !item.done).length}
                color="error"
              ></Badge>
            </Typography>

            <IconButton onClick={handleToggleMode} color="inherit">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddBtn();
          }}
        >
          <OutlinedInput
            fullWidth
            inputRef={inputRef}
            placeholder="Add a task..."
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
              color: theme.palette.text.primary,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark" ? "grey.700" : "grey.400",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
            }}
            endAdornment={
              <IconButton type="submit">
                <AddIcon />
              </IconButton>
            }
          />
        </form>

        {/* Pending Tasks */}
        <List sx={{ maxWidth: 500, mx: "auto", mt: 3 }}>
          {data
            .filter((task) => !task.done)
            .map((task) => (
              <Item
                key={task.id}
                task={task}
                remove={handleRemoveBtn}
                edit={handleEditBtn}
                toggle={toggle}
              />
            ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Completed Tasks */}
        <List>
          {data
            .filter((task) => task.done)
            .map((task) => (
              <Item
                key={task.id}
                task={task}
                remove={handleRemoveBtn}
                toggle={toggle}
              />
            ))}
        </List>
      </Container>
    </>
  );
};

export default App;
