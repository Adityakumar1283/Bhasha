import { Menu } from "lucide-react";

import{
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
}
from "@/components/ui/sheet";

import { Sidebar } from "@/components/sidebar"; 

import React from 'react'

export const Mobilesidebar = () => {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className="text-white">

            </Menu>
        </SheetTrigger>
        <SheetContent className="p-0 z-[100]" side="left">
        <SheetTitle> <Sidebar></Sidebar></SheetTitle>   
        </SheetContent>
    </Sheet>
  )
}


