import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { stat } from "fs";
import { on } from "events";

type Props = {
  onCheck: () => void;
  status: "correct" | "incorrect" | "none" | "completed";
  disabled?: boolean;
  lessonid?: boolean;
};
const Footer = ({ onCheck, status, disabled, lessonid }: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn(
        "lg:-h[140px] h-[100px] border-t-2 ",
        status === "correct" && "border-transparent bg-green-300",
        status === "incorrect" && "border-transparent bg-rose-300",
       
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {
          status ===  "correct" && (
            <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
              <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
              Nicely Done!</div>) 
        }
        {
          status ===  "incorrect" && (
            <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
              <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
              Try Again</div>) 
        }
        {
          status ===  "completed" && (
            <Button variant="default" 
            size={isMobile ? "sm" : "lg"}
              onClick={()=> window.location.href = `/lesson/${lessonid}`}
            >
              Practice More
            </Button>
          )
        }
        <Button
          disabled={disabled}
          onClick={onCheck}
          className="ml-auto "
          size={isMobile ? "sm" : "lg"}
          variant={status === "incorrect" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "incorrect" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
