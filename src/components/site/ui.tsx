import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const cta = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60",
  {
    variants: {
      variant: {
        ember: "bg-ember text-primary-foreground shadow-ember hover:brightness-110 hover:-translate-y-0.5",
        outline: "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
        ghost: "text-foreground hover:text-primary",
      },
      size: { md: "h-11 px-6 text-sm", lg: "h-14 px-8 text-base" },
    },
    defaultVariants: { variant: "ember", size: "md" },
  },
);
export type CtaProps = VariantProps<typeof cta>;

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-highlight">
      <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
      {children}
    </p>
  );
}

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow?: string; title: ReactNode; intro?: string; center?: boolean }) {
  return (
    <div className={cn("mb-12 max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
