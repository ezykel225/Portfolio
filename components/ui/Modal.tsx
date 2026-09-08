'use client'
import { useCallback, useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  /** id of the element labelling the dialog, for aria-labelledby. */
  labelledBy: string
  children: React.ReactNode
}

/**
 * A native <dialog> opened with showModal().
 *
 * Deliberately not a hand-rolled div: showModal() gives focus trapping,
 * Esc-to-close, inertness of the rest of the page and correct dialog
 * semantics from the platform, which is far harder to get right by hand
 * and is the whole point of the element.
 */
export function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // showModal() does not lock scrolling of the page behind the dialog.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Fires for Esc as well as our own close() calls, so state stays in sync.
  const handleClose = useCallback(() => onClose(), [onClose])

  // The dialog element fills the viewport; a click landing on the element
  // itself rather than on the panel inside it is a backdrop click.
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) onClose()
  }

  // The UA stylesheet gives <dialog> `color: CanvasText` (black), which every
  // uncoloured heading inside would otherwise inherit — invisible against the
  // dark panel. text-[var(--text)] below sets it explicitly.
  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={handleClick}
      aria-labelledby={labelledBy}
      className="m-0 max-h-none max-w-none bg-transparent p-0 text-[var(--text)] backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      style={{ width: '100%', height: '100%' }}
    >
      <div className="flex min-h-full w-full items-start justify-center p-0 sm:p-6">{children}</div>
    </dialog>
  )
}
