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
import useExitModal from "@/store/use_exitmodal";

const Exit_modal = () => {
  const router = useRouter();
  const [isClient, setClient] = useState(false);
  const { isOpen, close } = useExitModal();
  useEffect(() => setClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full mb-5 justify-center">
            <Image
              src="mascot_sad.svg"
              alt="Sad Mascot"
              height={80}
              width={80}
            ></Image>
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Wait Don&apos;t Go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Are you sure you want to exit? We&apos;d love to have you stay!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              Keep Learning
            </Button>
            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={()=>{
                close();
                router.push("/learn"); // Redirect to learn page
              }}
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Exit_modal;
