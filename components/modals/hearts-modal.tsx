"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import useHeartsModal from "@/store/use-heartsmodal";

const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setClient] = useState(false);
  const { isOpen, close } = useHeartsModal();
  useEffect(() => setClient(true), []);

  if (!isClient) {
    return null;
  }

  const onClick=()=>{
    close();
    router.push("/store");
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full mb-5 justify-center">
            <Image
              src="mascot_bad.svg"
              alt="Sad Mascot"
              height={80}
              width={80}
            ></Image>
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            You ran out of hearts
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Go Pro for unlimited hearts, or purchase them in the store.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={onClick}
            >
              Get Unlimited Hearts.
            </Button>
            <Button
              variant="primaryOutline"
              className="w-full"
              size="lg"
              onClick={close
              }
            >
              No Thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeartsModal;
