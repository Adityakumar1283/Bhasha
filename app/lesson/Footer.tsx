import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { stat } from "fs";
import { use } from "react";

type Props = {
  onCheck: () => void;
  status: "correct" | "incorrect" | "none" | "completed";
  disabled?: boolean;
  lessonid?: boolean;
};
const Footer = ({onCheck,status,disabled,lessonid}:Props ) => {

    useKey("Enter", onCheck, {}, [onCheck]);
const isMobile = useMedia("(max-width: 1024px)");

  return (
  <footer className={cn("lg:-h[140px] h-[100px] border-t-2 ", status === "correct" && "border-transparent bg-green-300", status === "incorrect" && "border-transparent bg-rose-300", status === "completed" && "border-transparent bg-sky-300")}>

        <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
            <Button disabled={disabled} onClick={onCheck} className="ml-auto " size={isMobile ? "sm" : "lg"} variant={status === "incorrect" ? "danger" :  "secondary"}>
                {status === "none" && "Check"}
                {status === "correct" && "Next"}
                {status === "incorrect" && "Retry"}
                {status === "completed" && "Continue"}
            </Button>
        </div>

  </footer>
  )
};

export default Footer;
