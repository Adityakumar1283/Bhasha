"use client";

import { courses, userProgress } from "@/config/schema";
import Card from "./Card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";
type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();

  const [pending,startTransition]= useTransition();
  const onClick = (id:number)=>{
    if(pending) return;
    if( id === activeCourseId){
      return router.push("/learn");
    }
    startTransition(() => {
 // console.log("Calling upsertUserProgress with id:", id);
   fetch("/api/upsert-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: id }),
    })
    .then(() => {
      console.log("upsertUserProgress resolved");
       router.push("/learn"); // Not needed, server action redirects
    })
    .catch((err) => {
      // Ignore Next.js redirect error
      if (err?.digest && String(err.digest).startsWith("NEXT_REDIRECT")) return;
      console.error("Client error:", err);
      toast.error("Something went wrong", err);
    });
});
  }
  return (
    <div className=" pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
