"use client";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { cn } from "@/lib/utils";
import "react-circular-progressbar";
import { Check, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }
  const rightPosition = indentationLevel * 35;
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompeleted = !current && !locked;
  const Icon = isCompeleted ? Check : isLast ? Crown : Star;

  const href = isCompeleted ? `/lesson/${id}` : "/lesson/";

  // Debug: log locked value and current state


  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompeleted ? 75:20,
        }}
      >
        {current ? (
          <div className="h-[102px] w-[102px] relative">
            <div className="absolute -top-15 left-1/2 -translate-x-1/2 px-3 py-2 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-widez-10 z-20">
              Start
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: "#4ade80",
                  
                },
                trail: {
                  stroke: "#e5e7eb",
                  
                },
              }}
            >

              <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="h-[70px] w-[70px] border-b-8"
                
              >
                <Icon
                  className={cn(
                    "h-10 w-10 ",
                    locked
                      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                      : "fill-primary-foreground text-primary-foreground ",
                    isCompeleted && "fill-none stroke-[4]"
                  )}
                />
              </Button>
           
            </CircularProgressbarWithChildren>
          </div>
        ) : (
            <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="h-[70px] w-[70px] border-b-8"
          
              >
                <Icon
                  className={cn(
                    "h-10 w-10 ",
                    locked
                      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                      : "fill-primary-foreground text-primary-foreground ",
                    isCompeleted && "fill-none stroke-[4]"
                  )}
                />
              </Button>
        )}
      </div>
    </Link>
  );
};

export default LessonButton;
