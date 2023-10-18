import { Box, Container, Stack } from "@mui/joy";
import NoteCard from "./NoteCard";
import NoteCardSkeleton from "./NoteCardSkeleton";
import { useNotes } from "./contexts/NotesProvider";

export default function NoteStack() {
  const { notes, isFetching } = useNotes();

  return (
    <Box>
      <Container maxWidth="sm">
        <Stack spacing={2}>
          {isFetching &&
            Array.from(Array(3).keys()).map((_, index) => (
              <NoteCardSkeleton key={index} />
            ))}
          {!isFetching &&
            notes.map((note) => <NoteCard key={note.id} {...note} />)}
        </Stack>
      </Container>
    </Box>
  );
}
