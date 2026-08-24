import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-50 transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        gold:
          "bg-burgundy text-ivory shadow-[0_1px_0_rgba(255,248,240,0.18)_inset,0_10px_30px_-12px_rgba(107,45,60,0.55)] hover:bg-burgundy-deep gold-sweep",
        ivory:
          "bg-ivory text-ink shadow-[0_0_0_1px_rgba(184,149,106,0.35),0_8px_24px_-12px_rgba(44,31,26,0.35)] hover:bg-cream",
        ghost:
          "bg-transparent text-ivory hover:bg-ivory/10",
        line:
          "bg-transparent text-ink shadow-[0_0_0_1px_rgba(184,149,106,0.45)] hover:bg-gold/10",
      },
      size: {
        sm: "h-10 px-4 text-sm rounded-full",
        md: "h-12 px-6 text-sm rounded-full",
        lg: "h-14 px-8 text-base rounded-full",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
