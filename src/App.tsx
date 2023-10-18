import { Stack } from "@mui/joy";
import CreateNoteForm from "./CreateNoteForm";
import EditNoteFormModal from "./EditNoteFormModal";
import Header from "./Header";
import NoteGrid from "./NoteGrid";
import NoteStack from "./NoteStack";
import { useView } from "./contexts/ViewProvider";

function App() {
  const { view } = useView();

  return (
    <Stack spacing={4} padding={2}>
      <EditNoteFormModal />
      <Header />
      <CreateNoteForm />
      {view === "grid" && <NoteGrid />}
      {view === "stack" && <NoteStack />}
    </Stack>
  );
}

export default App;
