import React, { useCallback } from 'react'
import { IdProvider } from '@basal-ui/id'

import AccordionHeader from './AccordionHeader'
import AccordionButton from './AccordionButton'
import AccordionItem from './AccordionItem'
import AccordionContent from './AccordionContent'
import AccordionSingle, { AccordionSingleProps } from './AccordionSingle'
import AccordionMultiple, { AccordionMultipleProps } from './AccordionMultiple'

export type AccordionCommonProps = {
  allowZeroCollapse?: boolean
  className?: string
  children: React.ReactNode
}

type AccordionCompoundedComponentType = React.ForwardRefExoticComponent<
  (AccordionSingleProps | AccordionMultipleProps) &
    React.RefAttributes<HTMLDivElement>
> & {
  Item: typeof AccordionItem
  Header: typeof AccordionHeader
  Button: typeof AccordionButton
  Content: typeof AccordionContent
}

const Accordion = React.forwardRef<
  HTMLDivElement,
  AccordionSingleProps | AccordionMultipleProps
>((props, forwardedRef) => {
  const renderAccordion = useCallback(() => {
    if (props.type === 'single') {
      return (
        <AccordionSingle
          {...(props as AccordionSingleProps)}
          ref={forwardedRef}
        />
      )
    }
    if (props.type === 'multiple') {
      return (
        <AccordionMultiple
          {...(props as AccordionMultipleProps)}
          ref={forwardedRef}
        />
      )
    }

    throw new Error(
      "Invalid Accordion `type` props. It's should be either `single` or `multiple`"
    )
  }, [props, forwardedRef])

  return <IdProvider>{renderAccordion()}</IdProvider>
}) as AccordionCompoundedComponentType

Accordion.displayName = 'Accordion'

Accordion.Item = AccordionItem
Accordion.Header = AccordionHeader
Accordion.Button = AccordionButton
Accordion.Content = AccordionContent

export default Accordion
