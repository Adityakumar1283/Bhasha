"use client";

import { use } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Props = {
  label: string;
  icon: string;
  href: string;
};

export const SidebarItem = ({ label, icon, href }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h[52px]"
      asChild
    >
      <Link href={href}>
        <Image src={icon} alt={label} className="mr-5" height={32} width={32} />
        {label}
      </Link>
    </Button>
  );
};
