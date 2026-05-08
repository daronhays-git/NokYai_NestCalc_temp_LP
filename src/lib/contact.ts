import type { MouseEvent } from 'react'

/**
 * Canonical contact constants — single source of truth.
 * Imported by Contact.tsx and Footer.tsx.
 */
export const EMAIL = 'daron@nestcalc.ai'
export const EMAIL_DISPLAY = 'daron@NestCalc.ai'

/**
 * Click handler for any email link. Copies the canonical
 * EMAIL to clipboard, calls onCopied (for optional toast
 * feedback), then navigates to the mailto: URL. Works
 * whether or not the user has a default mail app — the
 * clipboard copy is the silent fallback.
 *
 * @param e - The mouse event from the <a> click
 * @param onCopied - Optional callback fired after clipboard
 *                   write succeeds (use to flash a toast)
 */
export function copyAndOpenMailto(
  e: MouseEvent,
  onCopied?: () => void
) {
  e.preventDefault()
  void navigator.clipboard
    .writeText(EMAIL)
    .then(() => onCopied?.())
    .catch(() => {
      // clipboard write can fail on insecure origins or
      // older browsers — silent fail is fine, mailto still
      // navigates below
    })
  window.location.href = `mailto:${EMAIL}`
}
