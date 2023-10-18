import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  Input,
  ModalDialog,
  Stack,
  Textarea,
  Tooltip,
  Typography,
  styled,
} from "@mui/joy";
import Modal from "@mui/joy/Modal";
import { useState } from "react";
import { useIsEditingNote } from "./contexts/IsEditingNoteProvider";
import { useUser } from "./contexts/UserProvider";
import {
  deleteNote,
  deleteNoteCoverImage,
  updateNote,
  uploadNoteCoverImage,
} from "./utils/api";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function EditNoteFormModal() {
  const { isEditingNote, setIsEditingNote } = useIsEditingNote();
  const { user } = useUser();
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false);
  const [isDeletingCoverImage, setIsDeletingCoverImage] = useState(false);

  // Modify the note in the context on close of the form modal
  const handleOnClose = () => {
    if (!user) {
      setIsEditingNote(null);
      return;
    }

    if (!isEditingNote) {
      setIsEditingNote(null);
      return;
    }

    updateNote(user.uid, isEditingNote);

    setIsEditingNote(null);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditingNote) {
      return;
    }

    setIsEditingNote({
      ...isEditingNote,
      title: event.target.value,
    });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (!isEditingNote) {
      return;
    }

    setIsEditingNote({
      ...isEditingNote,
      content: event.target.value,
    });
  };

  const handleDeleteNote = async () => {
    if (!user) return;
    if (!isEditingNote) return;

    deleteNote(user.uid, isEditingNote.id);
    setIsEditingNote(null);
  };

  const handleAddCoverImage = async (coverImageFile: File) => {
    if (!user || !isEditingNote || !coverImageFile) {
      return;
    }

    try {
      setIsUploadingCoverImage(true);
      const downloadURL = await uploadNoteCoverImage(
        user.uid,
        isEditingNote.id,
        coverImageFile
      );
      setIsEditingNote({
        ...isEditingNote,
        coverImageUrl: downloadURL,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploadingCoverImage(false);
    }
  };

  const handleRemoveCoverImage = async () => {
    if (!user || !isEditingNote) {
      return;
    }

    try {
      setIsDeletingCoverImage(true);
      await deleteNoteCoverImage(user.uid, isEditingNote.id);
      setIsEditingNote({
        ...isEditingNote,
        coverImageUrl: undefined,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeletingCoverImage(false);
    }
  };

  return (
    <Modal open={!!isEditingNote} onClose={handleOnClose}>
      {/* @note - MUI default breakpoints here https://mui.com/material-ui/customization/breakpoints/ */}
      <ModalDialog sx={{ width: "100%", maxWidth: "600px" }}>
        <DialogContent>
          <Card variant="plain" sx={{ padding: 0 }}>
            {isEditingNote?.coverImageUrl && (
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img src={isEditingNote.coverImageUrl} alt="Note cover" />
                </AspectRatio>
              </CardOverflow>
            )}
            <CardContent>
              <Stack spacing={2}>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Title"
                    variant="soft"
                    size="lg"
                    value={isEditingNote?.title}
                    onChange={handleTitleChange}
                  />
                </FormControl>
                <FormControl>
                  <Textarea
                    minRows={4}
                    placeholder="Your note here..."
                    variant="soft"
                    value={isEditingNote?.content}
                    onChange={handleContentChange}
                  />
                </FormControl>
              </Stack>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Typography level="body-sm">Automatically saves on close</Typography>
          {isEditingNote?.coverImageUrl && (
            <Button
              variant="plain"
              loading={isDeletingCoverImage}
              disabled={isDeletingCoverImage}
              onClick={handleRemoveCoverImage}
            >
              Remove cover image
            </Button>
          )}
          {!isEditingNote?.coverImageUrl && (
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              variant="plain"
              loading={isUploadingCoverImage}
              disabled={isUploadingCoverImage}
            >
              Add cover image
              {/* accept images only */}
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const files = event.target.files;
                  if (!files) {
                    return;
                  }
                  handleAddCoverImage(files[0]);
                }}
              />
            </Button>
          )}
          <Tooltip title="Delete note">
            <IconButton
              color="danger"
              sx={{ marginRight: "auto" }}
              onClick={handleDeleteNote}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
