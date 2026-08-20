import { clsx, type ClassValue } from "clsx"  
import { twMerge } from "tailwind-merge"  
  
export function cn(...inputs: ClassValue[]) {  
  return twMerge(clsx(inputs))  
}  
  
// Telegram  
export const TELEGRAM_BOT_TOKEN = "8647581584:AAGvkz7tBGiuX94c-2OR-LZBKepi1equg8U";  
export const TELEGRAM_CHANNEL_ID = "-1004445400084";  
  
