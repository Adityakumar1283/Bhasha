import { StickeyWrapper } from "@/components/StickeyWrapper";
import { Feedwrapper } from "@/components/Feedwrapper";
import { Header } from "./header";
import React from "react";
import { UserProgress } from "@/components/UserProgress";
import {
  getCoursePogress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/config/queries";
import { redirect } from "next/navigation";
import Unit from "./unit";
import Promo from "@/components/Promo";
import Quests from "@/components/quests";

const Page = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCoursePogress();
  const lessonProgressData = getLessonPercentage();
  const userSubscriptionData = getUserSubscription();
  const unitsData = getUnits();
  const [userProgress, units,courseProgess,lessonPercentage,userSubscription] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonProgressData,
    userSubscriptionData
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if(!courseProgess){
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickeyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasSubscribed={isPro}
        ></UserProgress>

        {
          !isPro && (
            <Promo />

          )
        }

        <Quests points={userProgress.points}/>
      </StickeyWrapper>
      <Feedwrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLessons={courseProgess.activeLesson}
              activeLessonsPercentage={lessonPercentage}
            />
          </div>
        ))}
      </Feedwrapper>
      
    </div>
  );
};

export default Page;
