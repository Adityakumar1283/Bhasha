"use client";
import { challengeOptions, challenges } from "@/config/schema";
import { useState } from "react";
import Header from "./Header"; // Assuming you have a Header component
type Props = {
  initialPercentage: number;
  initialLessonId: number;
  initialHearts: number;
  initialLessonChallenges: ((typeof challenges.$inferSelect)[] & {
    compeleted: boolean;
    challengeOption: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any; // Replace with actual type if available
};
export const Quiz = ({
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  initialPercentage,
  userSubscription,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
    </>
  );
};
