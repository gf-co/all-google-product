import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";
import { useIsEditingNote } from "./contexts/IsEditingNoteProvider";
import { Note } from "./contexts/NotesProvider";

export default function NoteCard({ id, title, content, coverImageUrl }: Note) {
  const { setIsEditingNote } = useIsEditingNote();

  const handleCardClick = () => {
    setIsEditingNote({ id, title, content, coverImageUrl });
  };

  return (
    <Card
      variant="outlined"
      onClick={handleCardClick}
      sx={{
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
        cursor: "pointer",
      }}
    >
      {coverImageUrl && (
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={coverImageUrl} alt="Note cover" />
          </AspectRatio>
        </CardOverflow>
      )}
      <CardContent>
        <Typography
          level="h4"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
        <Typography
          level="body-lg"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
