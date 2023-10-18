import { Box, Container } from "@mui/joy";
import Masonry from "@mui/lab/Masonry";
import NoteCard from "./NoteCard";
import NoteCardSkeleton from "./NoteCardSkeleton";
import { useNotes } from "./contexts/NotesProvider";

export default function NoteGrid() {
  const { notes, isFetching } = useNotes();

  return (
    <Box>
      <Container maxWidth="lg">
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={2}
          sx={{ margin: 0 }}
        >
          {isFetching &&
            Array.from(Array(3).keys()).map((_, index) => (
              <NoteCardSkeleton key={index} />
            ))}
          {!isFetching &&
            notes.map((note) => <NoteCard key={note.id} {...note} />)}
        </Masonry>
      </Container>
    </Box>
  );
}
