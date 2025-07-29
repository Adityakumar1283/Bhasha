import { Feedwrapper } from "@/components/Feedwrapper";
import Image from "next/image";
import { StickeyWrapper } from "@/components/StickeyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { getTopUsers, getUserProgress, getUserSubscription } from "@/config/queries";
import { redirect } from "next/navigation";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";


const leaderPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const topUsersData = getTopUsers(); 
  const [userPogress,userSubscription,topUsers] = await Promise.all([userProgressData, userSubscriptionData, topUsersData]);

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
          <Image src={"/leaderboard.svg"} alt={"leaderboard"} height={90} width={90} />
          <h1 className="text-center text-2xl font-bold text-neutral-800">
            LeaderBoard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6 ">
            See Your Rank and Compete with Others.
          </p>
        
          <Separator className="mb-4 h-0.5 rounded-full " />
        {topUsers.map((userPogress, index) =>{
          return (
            <div key={userPogress.userId} className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50 " >
                <p className="font-bold text-lime-700 mr-4">
                  {index + 1} 
                </p>
              <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                <AvatarImage src={userPogress.userImageSrc} className="object-cover"/>
              </Avatar>
                <p className="text-neutral-800 font-bold flex-1">
                  {userPogress.userName} 
                </p>
                <p className="text-muted-foreground ">
                  {userPogress.points} XP
                </p>
              </div>
          )
        } )}
        </div>
      </Feedwrapper>
    </div>
  );
};

export default leaderPage;
