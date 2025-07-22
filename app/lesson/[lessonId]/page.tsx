import { getLesson, getUserProgress } from "@/config/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../Quiz";

type Props = {
  params: {
    lessonId: number;
  };
};

const LessonIdpage = async ({ params }: Props) => {
  const lessonId = params.lessonId;
  const lessonData = getLesson(lessonId);
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
      userSubscription={null}
      initialPercentage={initialPercentage}
    />
  );
};

export default LessonIdpage;
