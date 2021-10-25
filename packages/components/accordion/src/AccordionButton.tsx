import React, { useCallback } from 'react'
import keyboardKey from '@basal-ui/keyboard-keycode'

import useAccordionItemContext from './useAccordionItemContext'
import {
  focusFirstSibling,
  focusLastSibling,
  focusNextSibling,
  focusPreviousSibling
} from './utils/focus'

type AccordionButtonProps = {
  className?: string
  children: React.ReactNode
}

export default React.forwardRef<HTMLButtonElement, AccordionButtonProps>(
  function AccordionButton(props, forwardedRef) {
    const { open, onToggle, headerId, contentId } = useAccordionItemContext()

    const navigateFocus = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const elem = e.target as HTMLButtonElement

        switch (e.key) {
          case keyboardKey.SPACE:
          case keyboardKey.ENTER:
            e.preventDefault()
            onToggle && onToggle()
            break
          case keyboardKey.DOWN:
            e.preventDefault()
            focusNextSibling(elem)
            break
          case keyboardKey.UP:
            e.preventDefault()
            focusPreviousSibling(elem)
            break
          case keyboardKey.HOME:
            e.preventDefault()
            focusFirstSibling(elem)
            break
          case keyboardKey.END:
            focusLastSibling(elem)
            break
          default:
        }
      },
      [onToggle]
    )
    return (
      <button
        ref={forwardedRef}
        id={headerId}
        aria-controls={contentId}
        aria-expanded={open}
        aria-disabled={open}
        onClick={onToggle}
        onKeyDown={navigateFocus}
        data-basal-accordion-button=""
      >
        {props.children}
      </button>
    )
  }
)