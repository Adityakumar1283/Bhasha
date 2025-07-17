"use server";

import { db } from "@/config/db";
import { getCoursesById, getUserProgress } from "@/config/queries";
import { challengeProgress, challenges, userProgress } from "@/config/schema";
import { currentUser, auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();

  const user = await currentUser();
  console.log("userId:", userId, "user:", user); //remove this line in production
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
else{
  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "user",
    userImageSrc: user.imageUrl || "mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
}};
export const reduceHearts = async (challengeId: number) => {
  const {userId } = await auth();
  if (!userId) {
    throw new Error("User not Authorized");
  }
  const currentUserProgress = await getUserProgress();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge Not Found");
  }

  const lessonId = challenge.lessonId;
  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" };
  }

  if (!currentUserProgress) {
    throw new Error("User Progress Not found");
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quest");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};
