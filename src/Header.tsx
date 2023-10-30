import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Input,
  Link,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/joy";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { useColorScheme } from "@mui/joy/styles";
import { useState } from "react";
import { useNotes } from "./contexts/NotesProvider";
import { useUser } from "./contexts/UserProvider";
import { View, useView } from "./contexts/ViewProvider";

export default function Header() {
  const {
    user,
    isSigningIn,
    isSigningOut,
    isFetching,
    signInAsGuest,
    signOutAsGuest,
  } = useUser();
  const { view, setView } = useView();
  const { mode, setMode } = useColorScheme();
  const [keyword, setKeyword] = useState("");
  const theme = useTheme();
  const { originalList, setNotes } = useNotes();

  const handleToggleView = (newView: View) => {
    setView(newView);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;

    setKeyword(newKeyword);

    if (newKeyword === "") {
      setNotes(originalList);
      return;
    }

    const filteredList = originalList.filter(
      (note) =>
        note.title.toLowerCase().includes(newKeyword.toLowerCase()) ||
        note.content.toLowerCase().includes(newKeyword.toLowerCase())
    );

    setNotes(filteredList);
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link
              href="https://www.linkedin.com/in/gf-co/"
              rel="noopener noreferrer"
              target="_blank"
              level="body-md"
              marginRight={2}
              sx={{
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              }}
            >
              LinkedIn
            </Link>
            <Link
              href="https://gf-co.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              level="body-md"
              marginRight={2}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              }}
            >
              Portfolio
            </Link>
            <Link
              href="https://github.com/gf-co/all-google-product"
              target="_blank"
              rel="noopener noreferrer"
              level="body-md"
              marginRight={2}
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              Source Code
            </Link>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            marginLeft="auto"
            alignItems="center"
          >
            <Input
              placeholder="Search"
              value={keyword}
              onChange={handleKeywordChange}
              variant="soft"
              sx={{
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              }}
            />

            {view === "grid" && (
              <Tooltip title="Change to list view">
                <IconButton onClick={() => handleToggleView("stack")}>
                  <ViewAgendaOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
            {view === "stack" && (
              <Tooltip title="Change to grid view">
                <IconButton onClick={() => handleToggleView("grid")}>
                  <GridViewOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}

            {mode === "light" && (
              <Tooltip title="Change to dark mode">
                <IconButton onClick={() => setMode("dark")}>
                  <DarkModeOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
            {mode === "dark" && (
              <Tooltip title="Change to light mode">
                <IconButton onClick={() => setMode("light")}>
                  <LightModeOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}

            {!!user && (
              <Dropdown>
                <MenuButton
                  loading={isSigningOut}
                  sx={{ padding: 0 }}
                  variant="plain"
                >
                  <Avatar variant="outlined" />
                </MenuButton>
                <Menu>
                  <MenuItem onClick={signOutAsGuest}>Logout</MenuItem>
                </Menu>
              </Dropdown>
            )}

            {!user && (
              <Button
                variant="outlined"
                loading={isSigningIn}
                onClick={signInAsGuest}
                disabled={isFetching}
              >
                Guest sign in
              </Button>
            )}
          </Stack>
        </Stack>
        <Input
          placeholder="Search"
          variant="soft"
          sx={{
            [theme.breakpoints.up("sm")]: {
              display: "none",
            },
            marginTop: 2,
          }}
        />
      </Container>
    </Box>
  );
}
