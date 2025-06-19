import { challengeOptions } from "@/config/schema"

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status:"correcr" | "incorrect" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challengeOptions.$inferSelect["text"];

}


const Challenge = ({ }:Props) => {
  return (
    <div>
      challenge
    </div>
  )
}

export default Challenge
