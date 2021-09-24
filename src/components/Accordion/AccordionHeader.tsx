import React, { useCallback } from 'react'

import useAccordionItemContext from './useAccordionItemContext'
import {
  focusFirstSibling,
  focusLastSibling,
  focusNextSibling,
  focusPreviousSibling
} from './utils/focus'

import keyboardKey from './keyboardKey'

type AccordionHeaderProps = {
  children: React.ReactNode
}

export default function AccordionHeader(props: AccordionHeaderProps) {
  const { onToggle, contentId, headerId, isExpanded } =
    useAccordionItemContext()

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
    <h3 data-accordion-component="AccordionHeader">
      <button
        id={headerId}
        aria-controls={contentId}
        aria-expanded={isExpanded}
        aria-disabled={isExpanded}
        onClick={onToggle}
        onKeyDown={navigateFocus}
      >
        {props.children}
      </button>
    </h3>
  )
}
