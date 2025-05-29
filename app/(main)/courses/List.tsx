" use client";

import { courses } from "@/config/schema";

type Props = {
  courses: typeof courses.$inferSelect[];
  activeCourseId: number;
}

export const List = ({ }: Props) => {
return (

    <div> list</div>
)
}

