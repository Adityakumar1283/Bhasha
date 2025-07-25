import { Feedwrapper } from "@/components/Feedwrapper";
import Image from "next/image";
import { StickeyWrapper } from "@/components/StickeyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { getUserProgress, getUserSubscription } from "@/config/queries";
import { redirect } from "next/navigation";

import React from "react";
import Items from "./items";

const shopPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const [userPogress,userSubscription] = await Promise.all([userProgressData, userSubscriptionData]);

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
          <Image src={"/shop.svg"} alt={"Shop"} height={90} width={90} />
          <h1 className="text-center text-2xl font-bold text-neutral-800">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6 ">
            Spend your hard-earned points to buy items in the shop.
          </p>
          <Items
            hearts={userPogress.hearts}
            points={userPogress.points}
            hasSubscribed={!!userSubscription?.isActive}
          />
        </div>
      </Feedwrapper>
    </div>
  );
};

export default shopPage;
