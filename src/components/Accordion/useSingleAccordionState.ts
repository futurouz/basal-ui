import { useState, useRef, useCallback, useMemo } from 'react'

import { AccordionSingleProps } from './AccordionSingle'
import { ItemID } from './types'

type UseSingleAccordionStateProps = Pick<
  AccordionSingleProps,
  'allowZeroCollapse' | 'onToggle' | 'value' | 'preExpand'
>

export default function useSingleAccordionState(
  props: UseSingleAccordionStateProps
) {
  const isControlled = useRef(!!props.value)
  const [uncontrolledValue, setUncontrolledValue] = useState<ItemID>(() => {
    if (!isControlled.current) {
      return props.preExpand || ''
    }

    return ''
  })

  const value = isControlled.current ? props.value : uncontrolledValue

  const updateAccordionValue = isControlled.current
    ? props.onToggle
    : setUncontrolledValue

  const onToggle = useCallback(
    (newValue: ItemID) => {
      if (!updateAccordionValue) {
        return
      }

      if (value === newValue && props.allowZeroCollapse) {
        updateAccordionValue('')
        return
      }

      if (!value || (value && value.trim().length > 0)) {
        updateAccordionValue(newValue)
      }
    },
    [props.allowZeroCollapse, updateAccordionValue, value]
  )

  return useMemo(() => ({ value, onToggle }), [onToggle, value])
}