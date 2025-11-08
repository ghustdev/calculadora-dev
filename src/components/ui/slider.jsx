import * as React from "react"
import { cn } from "@/utils/cn"

const Slider = React.forwardRef(({ className, min = 5, max = 100, step = 1, value, onChange, ...props }, ref) => {
  const handleChange = (e) => {
    try {
      if (onChange && typeof onChange === 'function') {
        const newValue = Number(e.target.value)
        if (!isNaN(newValue)) {
          onChange(newValue)
        }
      }
    } catch (error) {
      console.warn('Error in slider onChange:', error)
    }
  }

  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value || min}
      onChange={handleChange}
      className={cn("w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer", className)}
      {...props}
    />
  )
})
Slider.displayName = "Slider"

export { Slider }