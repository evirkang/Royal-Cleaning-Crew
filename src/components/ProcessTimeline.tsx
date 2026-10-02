import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const steps = [
  ["01", "Discover", "Tell us about the property, timing and priorities."],
  ["02", "Choose", "Select a service and any detail work to consider."],
  ["03", "Estimate", "Share the scope so pricing can be reviewed honestly."],
  ["04", "Schedule", "Confirm access, availability and a service window."],
  ["05", "Clean", "The agreed checklist guides the work, room by room."],
  ["06", "Final check", "Review the finish and any agreed handoff details."],
] as const;

export function ProcessTimeline() {
  return (
    <section className="bg-[#222724] py-20 text-white sm:py-24 lg:py-28">
      <div className="container">
        <AnimatedSection className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div><p className="eyebrow">From request to ready</p><h2 className="display mt-4 max-w-2xl text-5xl sm:text-6xl">Good service begins before the clean.</h2></div>
          <p className="max-w-xl text-sm leading-7 text-white/62">A clear sequence keeps the property details, scope and timing visible from the first question through the final check.</p>
        </AnimatedSection>
        <div className="mt-12 grid border-l border-t border-white/20 sm:grid-cols-2 lg:grid-cols-6">
          {steps.map(([number, title, copy], index) => (
            <AnimatedSection className="min-h-[190px] border-b border-r border-white/20 p-4 sm:p-5 lg:min-h-[230px] lg:p-4" key={number}>
              <div className="flex items-center justify-between gap-3"><span className="display text-4xl text-[#c3a56f]">{number}</span>{index < steps.length - 1 && <ArrowRight className="hidden text-white/35 lg:block" size={15} />}</div>
              <h3 className="display mt-8 text-3xl">{title}</h3>
              <p className="mt-3 text-xs leading-5 text-white/58">{copy}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}