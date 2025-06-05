
import { StickeyWrapper } from "@/components/StickeyWrapper";
import { Feedwrapper } from "@/components/Feedwrapper";
import { Header} from "./header"
import React from "react";
import { UserProgress } from "@/components/UserProgress";
import { getUnits, getUserProgress } from "@/config/queries";
import { redirect } from "next/navigation";


const Page = async ()=>  {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const [ userProgress , units] = await Promise.all([
    userProgressData,unitsData
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
        { units.map((unit)=>(
          <div key={unit.id} className="mb-10">
            {JSON.stringify(unit)};
          </div>
        ))} 
      
      </Feedwrapper>
       
    </div>
  );
};

export default Page;
