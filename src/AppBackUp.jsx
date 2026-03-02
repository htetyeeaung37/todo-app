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
} from "@mui/material";

import {
  Add as AddIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { AppContext } from "./AppProvider";

const App = () => {
  const inputRef = useRef();

  const { mode, setMode } = useContext(AppContext);

  const [data, setData] = useState([
    { id: 1, title: "Making Bed", done: true },
    { id: 2, title: "Cooking", done: true },
    { id: 3, title: "Taking Shower", done: false },
  ]);

  const handleAddBtn = () => {
    const title = inputRef.current.value;
    if (title === "") return false;
    setData([...data, { id: Date.now(), title, done: false }]);
  };

  const handleRemoveBtn = (id) => {
    setData(data.filter((task) => task.id !== id));
  };

  const handleEditBtn = (id, newTitle) => {
    setData(
      data.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  };

  const toggle = (id) => {
    setData(
      data.map((item) => {
        if (item.id === id) item.done = !item.done;
        return item;
      }),
    );
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 10 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography sx={{flexGrow: 1}}>
              <Badge badgeContent={data.filter(item => !item.done).length} color="error">Todo List</Badge>
            </Typography>

            {mode == "dark" ? (
              <IconButton onClick={() => setMode("light")} color="inherit">
                <LightModeIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setMode("dark")} color="inherit">
                <DarkModeIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Container>

      <Container maxWidth="sm" sx={{ marginTop: 5 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddBtn();
            e.currentTarget.reset();
          }}
        >
          <OutlinedInput
            fullWidth
            inputRef={inputRef}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              "& .MuiIconButton-root": {
                color: "gray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
              "&.Mui-focused .MuiIconButton-root": {
                color: "black",
              },
            }}
            endAdornment={
              <IconButton type="submit">
                <AddIcon />
              </IconButton>
            }
          />
        </form>

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

        <Divider />

        <List>
          {data
            .filter((task) => task.done)
            .map((task) => (
              <Item key={task.id} task={task} remove={handleRemoveBtn} toggle={toggle} />
            ))}
        </List>
      </Container>
    </>
  );
};

export default App;
