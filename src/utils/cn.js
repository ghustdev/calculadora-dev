import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  try {
    return twMerge(clsx(inputs))
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Error in cn function:', error)
    }
    return ''
  }
}