import { challengeOptions } from "@/config/schema";
import { cn } from "@/lib/utils";
import { useAudio, useKey } from "react-use";
import Image from "next/image";
import { useCallback } from "react";

type Props = {
  id: number;
  imageSrc?: string | null;
  audioSrc?: string | null;
  text: string;
  shortcut?: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "incorrect" | "none";
  type: (typeof challengeOptions.$inferSelect)["text"];
};

const Card = ({
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
  type,
}: Props) => {
  const [audio, _, controls] = useAudio({
    src: audioSrc || "",
    
  });

  const handleClick = useCallback(() => {
    if (disabled) return;
    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  if (shortcut) {
  useKey(shortcut, handleClick, {}, [handleClick]);
}

  return (
    <div
      onClick={handleClick} 
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && status === "none" && "border-sky-300 bg-sky-100",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-200",
        selected &&
          status === "incorrect" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-200",

        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80ox] lg:max-h-[150px] w-full">
          <Image src={imageSrc} fill alt={text} />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />}
        <p
          className={cn(
            "text-sm lg:text-base font-semibold text-neutral-600",
            selected && "text-sky-500",
            selected && status === "correct" && "text-green-500",
            selected && status === "incorrect" && "text-rose-500"
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center text-neutral-600 lg:text-[15px] text-xs font-semibold rounded-full border-neutral-300",
            selected && "text-sky-300 border-sky-500",
            selected &&
              status === "correct" &&
              "text-green-500 border-green-500",
            selected &&
              status === "incorrect" &&
              "text-rose-500 border-rose-500"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};

export default Card;
