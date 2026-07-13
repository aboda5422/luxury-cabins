"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ClipboardList, Factory, MessagesSquare } from "lucide-react";
import { useLocalizedCms } from "@/components/CmsProvider";

const icons = [MessagesSquare, ClipboardList, Factory] as const;

export function ProcessSection() {
  const { home, processSteps } = useLocalizedCms();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#151b24] py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 80% 0%, rgba(255,180,0,0.16), transparent 55%), radial-gradient(ellipse 50% 45% at 10% 100%, rgba(201,164,91,0.1), transparent 50%), linear-gradient(165deg, #10151c 0%, #1a2332 48%, #121821 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="container-site relative">
        <motion.div
          className="mb-14 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-sm font-bold tracking-wide text-[var(--gold)]">
            {home.processEyebrow}
          </p>
          <h2 className="text-3xl font-extrabold text-white md:text-4xl lg:text-[2.6rem]">
            {home.processTitle}
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-16 bg-[var(--gold)]" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/65 md:text-base">
            {home.processSubtitle}
          </p>
        </motion.div>

        <motion.div
          className="relative grid gap-6 md:grid-cols-3 md:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.28,
                delayChildren: reduceMotion ? 0 : 0.12,
              },
            },
          }}
        >
          <div
            className="pointer-events-none absolute top-[4.5rem] right-[12%] left-[12%] hidden h-px bg-gradient-to-l from-transparent via-[var(--gold)]/40 to-transparent md:block"
            aria-hidden
          />

          {processSteps.map((step, index) => {
            const Icon = icons[index] ?? MessagesSquare;
            return (
              <motion.article
                key={step.step}
                className="group relative border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-8 text-center backdrop-blur-[2px] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--gold)]/45 hover:bg-white/[0.12]"
                variants={{
                  hidden: reduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 36, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <div className="absolute inset-x-0 top-0 h-[2px] origin-center scale-x-50 bg-[var(--gold)]/70 transition duration-300 group-hover:scale-x-100" />

                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--gold)] text-[#0f0f0f] shadow-[0_12px_32px_rgba(255,180,0,0.28)] transition group-hover:scale-105">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </span>
                </div>

                <p className="mb-2 text-xs font-extrabold tracking-[0.18em] text-[var(--gold)]">
                  {step.step}
                </p>
                <h3 className="text-xl font-extrabold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{step.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
