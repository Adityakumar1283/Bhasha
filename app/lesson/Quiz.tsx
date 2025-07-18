"use client";
import { challengeOptions, challenges } from "@/config/schema";
import { useState, useTransition } from "react";
import Header from "./Header"; // Assuming you have a Header component
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";
import Footer from "./Footer";
import Confetti from "react-confetti";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize } from "react-use";
import Image from "next/image";
import Result from "./Result";
import { useRouter } from "next/navigation";
type Props = {
  initialPercentage: number;
  initialLessonId: number;
  initialHearts: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    compeleted: boolean;
    challengeOption: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any; // Replace with actual type if available
};
export const Quiz = ({
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  initialPercentage,
  userSubscription,
}: Props) => {
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const [pending, startTransition] = useTransition();
  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.compeleted
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [status, setStatus] = useState<"correct" | "incorrect" | "none">(
    "none"
  );

  const challenge = challenges[activeIndex];

  const options = challenge?.challengeOption ?? [];
  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };
  const onContinue = () => {
    if (!selectedOption) return;
    if (status === "incorrect") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find((option) => option.correct);
    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              toast.error("Missing hearts");
              setStatus("none");
              setSelectedOption(undefined);
              return; // <-- Stop here, do not progress!
            } else {
              correctControls.play();
              setStatus("correct");
              setPercentage((prev) => prev + 100 / challenges.length);
              if (initialPercentage === 100) {
                setHearts((prev) => Math.min(prev + 1, 5));
              }
            }
          })
          .catch(() =>
            toast.error("An error occurred while updating challenge progress")
          );
      });
      console.log("Correct answer selected");
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              toast.error("Missing Hearts");
              setStatus("none");
              setSelectedOption(undefined);
              return;
            }
            incorrectControls.play();
            setStatus("incorrect");
            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("something went wrong, Try Again"));
      });
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={1000}
        />
        <div className="min-h-screen overflow-hidden flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center">
          <Image
            src="finish.svg"
            alt="Finished"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            src="finish.svg"
            alt="Finished"
            className="block lg:hidden"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-800">
            Nicely Done! <br /> You have completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <Result variant="points" value={challenges.length * 10} />
            <Result variant="hearts" value={challenges.length * 10} />
          </div>
         <Footer
          lessonid={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
        </div>
         
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? " Select the correct meaning"
      : challenge.question;

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />

      <div className="flex-1">
        <div className="h-full flex items-center justify-center ">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
