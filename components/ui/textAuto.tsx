"use client";
import React from "react";
import { type AnimationPlaybackControls, motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = React.forwardRef<
  {
    complete: () => void;
    pause: () => void;
  }, {
    words: string;
    className?: string;
  }

>(({
  words,
  className,
}: {
  words: string;
  className?: string;
}, ref) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  const [controls, setControls] = React.useState<AnimationPlaybackControls | null>(null);

  // animate the words
  // on render animate the words
  // on stop stop the animation
  // on end render the word without animation

  React.useEffect(() => {
    if (animate) {
      setControls(
        animate(
          "span",
          {
            opacity: 1,
          },
          {
            duration: 1,
            delay: stagger(0.2),
            ease: "easeInOut",
          },
        ),
      );
    }
  }, [animate]);

  //excutive handler
  React.useImperativeHandle(ref, () => ({
    complete: () => {
      controls?.complete();
    },
    pause: () => {
      controls?.pause();
    },
  }));


  return (
    <div className={cn("text-white font-bold sm:text-3xl md:text-5xl lg:text-7xl leading-snug tracking-wide", className)
    }>
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={word + idx}
              className="opacity-0"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
});

TextGenerateEffect.displayName = "TextGenerateEffect";
