import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function CourseLoaderCardSkeleton() {

  const RenderArr = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {RenderArr.map((col, index) =>
        <div key={index} className="col">
          <div className="card border border-light shadow p-3 rounded-4">
            <Skeleton variant="rounded" className="w-100 rounded-3" style={{ paddingTop: 200 }} width={210} height={60} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={160}/>
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton className="pl-3 rounded-3 mt-4 w-100" variant="rectangular" height={60} />
          </div>
        </div>
      )}
    </>
  );
}