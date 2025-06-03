
import { StickeyWrapper } from "@/components/StickeyWrapper";
import { Feedwrapper } from "@/components/Feedwrapper";
import { Header} from "./header"
import React from "react";
import { UserProgress } from "@/components/UserProgress";
import { getUserProgress } from "@/config/queries";
import { redirect } from "next/navigation";


const Page = async ()=>  {
  const userProgressData = getUserProgress();
  const [ userProgress] = await Promise.all([
    userProgressData
  ])

  if ( !userProgress || !userProgress.activeCourse){

    redirect("/courses");
    
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
     <StickeyWrapper>
      
      <UserProgress 
      activeCourse={userProgress.activeCourse}
      hearts={userProgress.hearts}
      points={userProgress.points}
      hasSubscribed={false}
      >
      </UserProgress>
      </StickeyWrapper>
      <Feedwrapper>
        <Header title={userProgress.activeCourse.title}/> 
      
      </Feedwrapper>
       
    </div>
  );
};

export default Page;
