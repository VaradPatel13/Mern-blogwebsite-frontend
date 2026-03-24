/**
 * cn — Antigravity utility function
 * Merges Tailwind class names safely.
 * Prevents class conflicts (e.g., conflicting bg- values).
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * truncate — Truncates a string to a given length.
 * @param {string} str
 * @param {number} maxLen
 */
export function truncate(str, maxLen = 120) {
  if (!str) return '';
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}

/**
 * slugify — Converts a string to a URL-friendly slug.
 * @param {string} str
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * getInitials — Extracts initials from a full name.
 * @param {string} fullName
 */
export function getInitials(fullName) {
  if (!fullName) return '?';
  return fullName
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
