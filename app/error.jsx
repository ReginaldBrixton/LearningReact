'use client';
import * as React from "react";
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export function AnimatedErrorScreen({
  title = "Oops! Something went wrong.",
  message = "An unexpected error occurred.",
  buttonText = "Try Again",
  onButtonClick,
  icon: Icon = XCircle,
  iconClassName = "text-destructive"
}) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}>
        <Icon className={`w-24 h-24 ${iconClassName}`} />
      </motion.div>
      <motion.h2
        className="text-2xl font-bold mt-8 mb-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}>
        {title}
      </motion.h2>
      <motion.p
        className="text-muted-foreground mb-8 text-center max-w-md px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}>
        {message}
      </motion.p>
      {onButtonClick && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>
          <Button onClick={onButtonClick}>{buttonText}</Button>
        </motion.div>
      )}
    </div>
  );
}

// Add this default export
export default function ErrorPage({ error, reset }) {
  return (
    <AnimatedErrorScreen
      title="Oops! Something went wrong."
      message={error?.message || "An unexpected error occurred."}
      buttonText="Try Again"
      onButtonClick={reset}
    />
  );
}

export { Button, buttonVariants }