import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import App from "./App";
import { CssBaseline } from "@mui/material";

export const AppContext = createContext();

const AppProvider = ({children}) => {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#121212" : "#f5f5f5",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
      }),
    [mode],
  );

  return (
    <AppContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <App />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
