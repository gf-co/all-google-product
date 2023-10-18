import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import {
  Box,
  Container,
  FormControl,
  Input,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { useUser } from "./contexts/UserProvider";
import { NoteWithoutId, createNote } from "./utils/api";

export default function CreateNoteForm() {
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUser();

  const handleClickAwayFromForm = () => {
    setIsTextFieldFocused(false);
    if (title === "" && content === "") {
      return;
    }
    handleCreateNote({
      title,
      content,
    });
    setTitle("");
    setContent("");
  };

  const handleCreateNote = async (noteWithoutId: NoteWithoutId) => {
    if (!user) return;

    await createNote(user.uid, {
      ...noteWithoutId,
    });
  };

  return (
    <Box>
      <Container maxWidth="md">
        <ClickAwayListener onClickAway={handleClickAwayFromForm}>
          <Box>
            <Stack spacing={2}>
              <FormControl>
                <Input
                  type="text"
                  onFocus={() => setIsTextFieldFocused(true)}
                  placeholder={
                    !!user
                      ? isTextFieldFocused
                        ? "Title"
                        : "Take a note"
                      : "Take a note by signing in as guest"
                  }
                  variant="soft"
                  size="lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={!user}
                  readOnly={!user}
                />
              </FormControl>

              {isTextFieldFocused && (
                <>
                  <FormControl>
                    <Textarea
                      minRows={4}
                      placeholder="Your note here..."
                      variant="soft"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      disabled={!user}
                      readOnly={!user}
                    />
                  </FormControl>
                  <Box>
                    <Typography
                      level="body-sm"
                      marginLeft="auto"
                      width="fit-content"
                    >
                      Automatically saves on close
                    </Typography>
                  </Box>
                </>
              )}
            </Stack>
          </Box>
        </ClickAwayListener>
      </Container>
    </Box>
  );
}
