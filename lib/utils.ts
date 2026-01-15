import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import nextConfig from "../next.config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const basePath = nextConfig.basePath || "";

export function getValidationImagePath(src: string) {
  if (!src) return src;
  if (src.startsWith('http')) return src;
  if (!src.startsWith('/')) return src;
  if (basePath && src.startsWith(basePath)) return src;
  return `${basePath}${src}`;
}
