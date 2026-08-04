// Shared client-side input sanitisers for lead / application forms.

/** Names: letters, spaces and dots only. */
export const filterName = (v: string) => v.replace(/[^a-zA-Z\s.]/g, '')

/** Phone: digits plus the usual phone punctuation (+, -, space, parentheses). */
export const filterPhone = (v: string) => v.replace(/[^\d+\-\s()]/g, '')

// Reusable HTML validation attributes.
export const phoneAttrs = {
  inputMode: 'tel' as const,
  pattern: '[0-9+\\-\\s()]{7,15}',
  title: 'Enter a valid phone number (7–15 digits)',
  maxLength: 18,
}

/** Must contain at least one letter — blocks all-numeric junk. */
export const hasLetterAttrs = {
  pattern: '.*[A-Za-z].*',
  title: 'Please enter a valid value',
}
