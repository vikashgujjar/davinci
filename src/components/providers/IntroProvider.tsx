"use client";

import { LayoutGroup, MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type IntroState = { done: boolean; finish: () => void };

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

export const useIntro = () => useContext(IntroContext);

/** Global motion config (respects prefers-reduced-motion) + intro sequencing. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <IntroContext.Provider value={{ done, finish }}>{children}</IntroContext.Provider>
      </LayoutGroup>
    </MotionConfig>
  );
}
