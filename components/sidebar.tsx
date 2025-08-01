import Image from "next/image";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex  h-full lg:w-[256px] lg:fixed top-0 px-4 border-r-2 flex-col ",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src={"/mascot.svg"} width={40} height={40} alt="logo" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Bhasha
          </h1>
        </div>
      </Link>
      <div className=" flex flex-col gap-y-2 flex-1">
        <SidebarItem label={"Learn"} icon="/learn.svg" href={"/learn"} />
        <SidebarItem
          label={"Leaderboard"}
          icon="/leaderboard.svg"
          href="/leaderboard"
        />
        <SidebarItem label={"quests"} icon="/quests.svg" href={"/quest"} />
        <SidebarItem label={"shop"} icon="/shop.svg" href={"/shop"} />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSwitchSessionUrl="/" />
          logout
        </ClerkLoaded>
      </div>
    </div>
  );
};
