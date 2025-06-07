import { lessons, units } from "@/config/schema";

import UnitBanner from "./UnitBanner";
import LessonButton from "./LessonButton";
type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLessons:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;

  activeLessonsPercentage: number;
};

const Unit = ({
  id,
  order,
  description,
  title,
  lessons,
  activeLessons,
  activeLessonsPercentage,
}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className=" flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLessons?.id;
          const isLocked = !lesson.completed && !isCurrent;
              
          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonsPercentage}
            />
          );
        })}
      </div>
    </>
  );
};

export default Unit;
