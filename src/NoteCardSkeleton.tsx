import { Card, Skeleton } from "@mui/joy";

export default function NoteCardSkeleton() {
  return (
    <Card variant="outlined">
      <Skeleton variant="rectangular" height={50} />
      {/* <Skeleton variant="text" height={70} /> */}
      {/* <Skeleton variant="text" height={30} /> */}
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Card>
  );
}
