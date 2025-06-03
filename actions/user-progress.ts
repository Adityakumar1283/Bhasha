"use server";

import { db } from "@/config/db";
import { getCoursesById, getUserProgress } from "@/config/queries";
import { userProgress } from "@/config/schema";
import { currentUser, auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();

  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("unauthorized");
  }

  const course = await getCoursesById(courseId);

  if (!course) {
    throw new Error("course not found");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db
      .update(userProgress)
      .set({
        activeCourseId: courseId,
        userName: user.firstName || "user",
        userImageSrc: user.imageUrl || "mascot.svg",
      })
      .where(eq(userProgress.userId, userId));
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");

  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "user",
    userImageSrc: user.imageUrl || "mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
  
};
