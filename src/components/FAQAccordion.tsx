"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function FAQAccordion({ items }: { items: readonly (readonly [string, string])[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-[var(--line)]">
      {items.map(([question, answer], index) => {
        const expanded = active === index;
        const answerId = `faq-answer-${index}`;
        return (
          <section className="border-b border-[var(--line)]" key={question}>
            <h3>
              <button
                type="button"
                className="flex min-h-[66px] w-full items-center justify-between gap-5 py-4 text-left"
                aria-expanded={expanded}
                aria-controls={answerId}
                onClick={() => setActive(expanded ? null : index)}
              >
                <span className="text-sm font-semibold leading-6">{question}</span>
                <span className="shrink-0 text-[var(--brass)]">{expanded ? <Minus size={17} /> : <Plus size={17} />}</span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={answerId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: .2 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-[var(--muted)]">{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}
    </div>
  );
}