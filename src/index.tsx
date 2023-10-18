import "@fontsource/inter";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { IsEditingNoteProvider } from "./contexts/IsEditingNoteProvider";
import { NotesProvider } from "./contexts/NotesProvider";
import { UserProvider } from "./contexts/UserProvider";
import { ViewProvider } from "./contexts/ViewProvider";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <CssVarsProvider theme={githubTheme}> */}
    {/* @note - https://mui.com/joy-ui/customization/dark-mode/ */}
    {/* <CssVarsProvider defaultMode="system"> */}
    <CssVarsProvider>
      <CssBaseline />
      <UserProvider>
        <ViewProvider>
          <NotesProvider>
            <IsEditingNoteProvider>
              <App />
            </IsEditingNoteProvider>
          </NotesProvider>
        </ViewProvider>
      </UserProvider>
    </CssVarsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
