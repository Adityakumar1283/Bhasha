"use server";
import { challengeProgress, challenges, userProgress } from "@/config/schema";
import { db } from "@/config/db";
import { getUserProgress } from "@/config/queries";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) throw new Error("User progress not found");

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;
  const existingProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPracticed = !!existingProgress;
  if (currentUserProgress.hearts === 0 && !isPracticed) {
    return { error: "hearts" };
  }

  if (isPracticed) {
    await db
      .update(challengeProgress)
      .set({ completed: true })
      .where(eq(challengeProgress.id, existingProgress.id));

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/lesson");
    revalidatePath("/learn");
    revalidatePath("/quest");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db.insert(challengeProgress).values({
    userId,
    challengeId,
    completed: true,
  });

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/lesson");
  revalidatePath("/learn");
  revalidatePath("/quest");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};
