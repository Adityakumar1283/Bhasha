import { Button } from "@/components/ui/button";

function ButtonsPage() {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <Button>Default</Button>
      <Button variant={"primary"}>Primary</Button>
      <Button variant={"primaryOutline"}>Primary Outline</Button>
      <Button variant={"secondary"}>secondary</Button>
      <Button variant={"secondaryOutline"}>secondary Outline</Button>
      <Button variant={"danger"}>secondary</Button>
      <Button variant={"dangerOutline"}>secondary Outline</Button>
      <Button variant={"super"}>super</Button>
      <Button variant={"superOutline"}>super Outline</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"sidebar"}>sidebar</Button>
      <Button variant={"sidebarOutline"}>sidebar Outline</Button>
    </div>
  );
}

export default ButtonsPage;