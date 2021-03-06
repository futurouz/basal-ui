import React from 'react'
import Portal from '@basal-ui/portal'

import useDialogContext from './useDialogContext'

type DialogOverProps = React.HTMLAttributes<HTMLDivElement>

export default React.forwardRef<HTMLDivElement, DialogOverProps>(
  function DialogOverlay(props, forwardedRef) {
    const context = useDialogContext()

    if (!context.open) {
      return null
    }

    return (
      <Portal>
        <div
          ref={forwardedRef}
          data-basal-dialog-overlay=""
          data-state={context.open ? 'open' : 'closed'}
          {...props}
        />
      </Portal>
    )
  }
)
