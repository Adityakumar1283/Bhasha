import { StickeyWrapper } from "@/components/StickeyWrapper";
import { Feedwrapper } from "@/components/Feedwrapper";
import { Header} from "./header"
import React from "react";
import { UserProgress } from "@/components/UserProgress";
import { title } from "process";

const Page = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
     <StickeyWrapper>
      <UserProgress 
      activeCourse={{ title: "Spanish", imagSrc: "/es.svg" }}
      hearts={5}
      points={100}
      hasSubscribed={false}
      >
      </UserProgress>
      </StickeyWrapper>
      <Feedwrapper>
        <Header title="Spanish"/> 
      </Feedwrapper>
       
    </div>
  );
};

export default Page;
