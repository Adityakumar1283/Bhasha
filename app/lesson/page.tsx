import { getLesson, getUserProgress } from "@/config/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./Quiz";
const Lessonpage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.compeleted).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges.map(
        ({ challengeOptions, ...rest }) => ({
          ...rest,
          challengeOption: challengeOptions,
        })
      )}
      initialHearts={userProgress.hearts}
      userSubscription={null} // Assuming userSubscription is not defined in this context
      initialPercentage={initialPercentage}
    />
  );
};

export default Lessonpage;
