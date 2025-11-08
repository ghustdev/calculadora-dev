import * as React from "react"
import { cn } from "@/utils/cn"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const safeClassName = React.useMemo(() => {
    try {
      return cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      );
    } catch (error) {
      console.warn('Error in Input className:', error);
      return 'flex h-10 w-full rounded-md border px-3 py-2 text-sm';
    }
  }, [className]);

  return (
    <input
      type={type}
      className={safeClassName}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }