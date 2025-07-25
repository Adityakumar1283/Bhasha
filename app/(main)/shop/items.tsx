"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { onRefillHearts } from "@/actions/user-progress";
import { toast } from "sonner";
type Props = {
  hearts: number;
  points: number;
  hasSubscribed: boolean;
};
const Points_To_Refill = 10;
const items = ({ hearts, points, hasSubscribed }: Props) => {
  const [pending, startTransition] = useTransition();

  const refillHearts = () => {
    if (pending || hearts === 5 || points < Points_To_Refill) return;
    startTransition(() => {
      onRefillHearts().catch(() => toast.error("Failed to refill hearts"));
    });
  };

  const onUpgrade = () => {
    if (pending || hasSubscribed) return;
    startTransition(() => {
      
    });
  }

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2 ">
        <Image src="/heart.svg" alt="Hearts" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-800 text-base lg:text-xl font-bold">
            Refill your hearts.
          </p>
        </div>
        <Button
          onClick={refillHearts}
          disabled={hearts === 5 || points < Points_To_Refill || pending}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center ">
              <Image src="/points.svg" alt="Points" height={30} width={30} />
              <p>{Points_To_Refill}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2 ">
        <Image
          src="/unlimited.svg"
          alt="Unlimited Hearts"
          height={60}
          width={60}
        />
        <div className="flex-1">
          <p className="text-neutral-800 text-base lg:text-xl font-bold">
            Unlimited Hearts
          </p>

        </div>
        <Button disabled={pending || hasSubscribed} onClick={onUpgrade} >
          {hasSubscribed ? 
            "active"
           : "upgrade"}
            
        </Button>
      </div>
    </ul>
  );
};

export default items;
