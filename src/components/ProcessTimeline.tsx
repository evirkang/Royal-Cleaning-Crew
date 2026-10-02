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
    <section className="relative isolate overflow-hidden bg-[#222724] py-24 text-white sm:py-28 lg:py-32">
      <div className="container">
        
        {/* Header Block */}
        <AnimatedSection className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c3a56f]" />
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--brass-light)]">
                From request to ready
              </p>
            </div>

            <h2 className="display mt-4 max-w-2xl text-3xl font-light tracking-tight sm:text-5xl lg:text-[54px] leading-[1.08] text-white">
              Good service begins <br className="hidden sm:inline" />
              <span className="font-medium text-white/95">before the clean.</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-right">
            A clear sequence keeps the property details, scope and timing visible from the first question through the final check.
          </p>
        </AnimatedSection>

        {/* 6-Step Process Cards Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {steps.map(([number, title, copy], index) => (
            <AnimatedSection
              key={number}
              className="group relative flex min-h-[220px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c3a56f]/50 hover:bg-white/[0.06] hover:shadow-xl lg:p-6"
            >
              {/* Top Header: Step Number & Sequence Arrow */}
              <div className="flex items-center justify-between gap-2">
                <span className="display text-3xl font-light text-[#c3a56f] transition-transform duration-300 group-hover:scale-105">
                  {number}
                </span>

                {index < steps.length - 1 ? (
                  <div className="hidden h-6 w-6 items-center justify-center rounded-full border border-white/10 text-white/30 transition-colors group-hover:border-[#c3a56f]/40 group-hover:text-[#c3a56f] xl:flex">
                    <ArrowRight size={13} />
                  </div>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-[#c3a56f]/60" />
                )}
              </div>

              {/* Bottom Body: Title & Description */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h3 className="display text-xl font-normal text-white sm:text-2xl transition-colors group-hover:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/65">
                  {copy}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}