import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 合并CSS类名 - 用于Tailwind CSS类名合并
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 