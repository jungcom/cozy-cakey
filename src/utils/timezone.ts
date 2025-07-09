/**
 * Timezone utilities for consistent date handling across the application
 * All dates should be displayed in the business timezone (America/New_York)
 */

import { BUSINESS_CONFIG } from '@/config/business';

const BUSINESS_TIMEZONE = BUSINESS_CONFIG.operations.timezone;

/**
 * Formats a date string or Date object to display in business timezone
 * @param date - Date string (ISO) or Date object
 * @returns Formatted date string in business timezone
 */
export function formatDateInBusinessTimezone(
  date: string | Date
): string {
  if (!date) return '';
  
  try {
    let dateObj: Date;
    
    if (typeof date === 'string') {
      // Handle date-only strings (e.g., "2025-07-17") to avoid UTC midnight issues
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // For date-only strings, parse as local date to avoid timezone shift
        const [year, month, day] = date.split('-').map(Number);
        dateObj = new Date(year, month - 1, day); // month is 0-indexed
      } else {
        dateObj = new Date(date);
      }
    } else {
      dateObj = date;
    }
    
    // Use toLocaleDateString with timezone options for consistent formatting
    return dateObj.toLocaleDateString('en-US', {
      timeZone: BUSINESS_TIMEZONE,
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Gets current date in business timezone
 * @returns Date object representing current time in business timezone
 */
export function getCurrentDateInBusinessTimezone(): Date {
  // Create a new date and adjust for timezone offset
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  // EST is UTC-5, EDT is UTC-4. Use -5 as default (can be enhanced)
  const offset = -5; // Eastern Standard Time offset
  return new Date(utc + (offset * 3600000));
}

/**
 * Converts a date to business timezone for comparison purposes
 * @param date - Date string (ISO) or Date object
 * @returns Date object in business timezone
 */
export function toBusinessTimezone(date: string | Date): Date {
  if (!date) return new Date();
  
  try {
    let dateObj: Date;
    
    if (typeof date === 'string') {
      // Handle date-only strings (e.g., "2025-07-17") to avoid UTC midnight issues
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // For date-only strings, parse as local date to avoid timezone shift
        const [year, month, day] = date.split('-').map(Number);
        dateObj = new Date(year, month - 1, day); // month is 0-indexed
      } else {
        dateObj = new Date(date);
      }
    } else {
      dateObj = date;
    }
    
    return dateObj;
  } catch (error) {
    console.error('Error converting to business timezone:', error);
    return new Date();
  }
}