import { Feedwrapper } from "@/components/Feedwrapper";
import Image from "next/image";
import { StickeyWrapper } from "@/components/StickeyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { getUserProgress, getUserSubscription } from "@/config/queries";
import { redirect } from "next/navigation";

import React from "react";
import { Progress } from "@/components/ui/progress";

const quests = [
  {
    title: "Earn 20 XP",
    value: 20 ,
  },
  {
    title: "Earn 50 XP",
    value: 50 ,
  },
  {
    title: "Earn 80 XP",
    value: 80 ,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  },
];

const questPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userPogress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userPogress || !userPogress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickeyWrapper>
        <UserProgress
          activeCourse={userPogress.activeCourse}
          hearts={userPogress.hearts}
          points={userPogress.points}
          hasSubscribed={!!userSubscription?.isActive}
        />
      </StickeyWrapper>
      <Feedwrapper>
        <div className="w-full flex flex-col items-center ">
          <Image src={"/quests.svg"} alt={"Quests"} height={90} width={90} />
          <h1 className="text-center text-2xl font-bold text-neutral-800">
            Quest
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6 ">
            Compelete Quests by earing Points and Hearts.
          </p>
          <ul className="w-full ">
            {quests.map((quests) => {
              const progress = (userPogress.points / quests.value) * 100;
              
              return (
                <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                  <Image
                    src="points.svg"
                    alt={"Points"}
                    width={60}
                    height={60}
                  />
                  <div className=" flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-800 font-bold text-xl" >
                      {quests.title}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </Feedwrapper>
    </div>
  );
};

export default questPage;
