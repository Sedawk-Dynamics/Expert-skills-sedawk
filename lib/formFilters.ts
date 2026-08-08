// Shared client-side input sanitisers for lead / application forms.

/** Names: letters, spaces and dots only. */
export const filterName = (v: string) => v.replace(/[^a-zA-Z\s.]/g, '')

/** Phone: exactly 10 digits — strip everything non-numeric and cap at 10. */
export const filterPhone = (v: string) => v.replace(/\D/g, '').slice(0, 10)

/** Email: always lowercase, no spaces. */
export const filterEmail = (v: string) => v.replace(/\s/g, '').toLowerCase()

/** True when the URL points to Google Drive/Docs or LinkedIn. */
export const isResumeLinkValid = (v: string) =>
  /^https?:\/\/(www\.)?(drive\.google\.com|docs\.google\.com|linkedin\.com)\/\S+/i.test(
    v.trim()
  )

// Reusable HTML validation attributes for a 10-digit phone number.
export const phoneAttrs = {
  inputMode: 'numeric' as const,
  pattern: '[0-9]{10}',
  title: 'Enter a 10-digit phone number',
  maxLength: 10,
  minLength: 10,
}

/** Must contain at least one letter — blocks all-numeric junk. */
export const hasLetterAttrs = {
  pattern: '.*[A-Za-z].*',
  title: 'Please enter a valid value',
}
