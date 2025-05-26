import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className=" hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button 
        size="lg" 
        variant="ghost" 
        >
          Coratian
          <Image 
          src="/hr.svg" 
          alt="Coratian" 
          height={32}
           width={40}
           className="mr-4 rounded-md"
           ></Image>
        </Button>
        
        <Button 
        size="lg" 
        variant="ghost" 
      >
          French
          <Image 
          src="/fr.svg" 
          alt="french" 
          height={32}
           width={40}
           className="mr-4 rounded-md"
           ></Image>
        </Button>
        <Button 
        size="lg" 
        variant="ghost" 
        >
          Italian
          <Image 
          src="/it.svg" 
          alt="italian" 
          height={32}
           width={40}
           className="mr-4 rounded-md"
           ></Image>
        </Button>
        <Button 
        size="lg" 
        variant="ghost" 
        >
          Japanese
          <Image 
          src="/jp.svg" 
          alt="japanese" 
          height={32}
           width={40}
           className="mr-4 rounded-md"
           ></Image>
        </Button>
      </div>
        
      
      foooterr
    </footer>
  
  );
};
