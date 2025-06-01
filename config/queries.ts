

import { cache } from "react";
import {db }from "./db";
import { auth } from "@clerk/nextjs/server"
import { courses, userProgress } from "./schema";
import { eq } from "drizzle-orm";

export const getUserProgress = cache(async () => {
    const {userId} = await auth();
        if (!userId){
            return null;
        }
        const data = await db.query.userProgress.findFirst({
          where: eq(userProgress.userId, userId),
          with: {
            activeCourse: true,
          }
        })
          return data;
})


export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

export const getCoursesById = cache( async(courseId:number )=>{
  const data = await db.query.courses.findFirst({
    where: eq(courses.id,courseId),
  });

  return data;

})