import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-base focus-visible:ring-ring transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-pressed",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // BioAdapt custom variants
        healing: "bg-gradient-healing text-secondary-foreground hover:opacity-90 shadow-md border-0",
        energy: "bg-gradient-energy text-accent-foreground hover:opacity-90 shadow-md border-0",
        nature: "bg-gradient-calm border border-secondary/20 text-foreground hover:bg-secondary/10 backdrop-blur-sm",
        session: "bg-primary/90 text-primary-foreground hover:bg-primary border-2 border-primary-foreground/20 backdrop-blur-sm shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-12 px-8 py-4 text-lg",
        xl: "h-14 px-10 py-5 text-xl",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    // Compose variant classes first, then merge any user-provided className.
    // Passing className into cva isn't reliable across versions so keep it explicit.
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
