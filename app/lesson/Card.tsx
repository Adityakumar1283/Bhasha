import { challengeOptions } from "@/config/schema";

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
type: typeof challengeOptions.$inferSelect["text"];


}

const Card = ({id,imageSrc,audioSrc,text,shortcut,selected,onClick,disabled,status,type }:Props) => {
  return (
    <div>
        cards
      
    </div>
  )
}

export default Card
