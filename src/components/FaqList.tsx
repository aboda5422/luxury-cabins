"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocalizedCms } from "@/components/CmsProvider";

export function FaqList() {
  const { faqs } = useLocalizedCms();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-navy/10 border border-navy/10 bg-white">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-base font-bold text-navy md:text-lg">{item.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[var(--gold)] transition ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-8 text-muted md:text-base">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
