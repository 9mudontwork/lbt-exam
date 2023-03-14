import { cx } from '@emotion/css'
import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  shift,
  autoUpdate,
  arrow,
  safePolygon,
  type Placement,
  useId,
} from '@floating-ui/react'
import { useState, useRef } from 'react'

interface Props extends React.PropsWithChildren {
  title: string | number
  placement?: Placement
}

export const Tooltip: React.FC<Props> = ({
  children,
  title,
  placement = 'top',
}: Props) => {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)

  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    placement: placement,
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, {
    handleClose: safePolygon(),
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <>
      <div
        aria-describedby={`${id}-tooltip`}
        ref={refs.setReference}
        {...getReferenceProps()}
        className="relaitve"
      >
        {children}
      </div>

      <div
        id={`${id}-tooltip`}
        role="tooltip"
        className={cx(
          'top-0 left-0 z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm dark:bg-gray-700',
          isOpen ? 'visible' : 'invisible'
        )}
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          width: 'max-content',
        }}
        {...getFloatingProps()}
      >
        {title}
        {/* <div ref={arrowRef} className="tooltip-arrow" data-popper-arrow></div> */}
      </div>
    </>
  )
}
