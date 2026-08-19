import * as React from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl bg-ivory/80 px-4 text-base text-ink shadow-[0_0_0_1px_rgba(184,149,106,0.28)] placeholder:text-muted outline-none focus-visible:shadow-[0_0_0_2px_rgba(184,149,106,0.55)]",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-xl bg-ivory/80 px-4 py-3 text-base text-ink shadow-[0_0_0_1px_rgba(184,149,106,0.28)] placeholder:text-muted outline-none focus-visible:shadow-[0_0_0_2px_rgba(184,149,106,0.55)]",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm font-medium tracking-wide text-ink/80", className)}
      {...props}
    />
  );
}
