import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function VideoSkeleton() {
  return (
    <Skeleton className="rounded-4" style={{ paddingTop: 400,paddingBottomF: 400, marginTop: 0, marginBottom: 0 }} />
  );
}
