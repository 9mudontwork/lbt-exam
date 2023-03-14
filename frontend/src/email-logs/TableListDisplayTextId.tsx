import { Tooltip } from '@/components/Tooltip'
import { useHoverDirty, useCopyToClipboard } from 'react-use'
import { When } from '@/components/Utils/When'
import { IconMdiContentCopy } from '@/components/Utils/Icon'
import { useRef, useMemo } from 'react'

export const TableListDisplayTextId = ({ text }: { text: string }) => {
  const spanRef = useRef(null)
  const isHover = useHoverDirty(spanRef)
  const [, copyToClipboard] = useCopyToClipboard()

  const textMemo = useMemo(() => {
    return text || '-'
  }, [text])

  return (
    <>
      <Tooltip title={textMemo}>
        <div className="flex flex-nowrap gap-2" ref={spanRef}>
          <p className="m-0 truncate">{textMemo}</p>
          <When is={isHover}>
            <span
              className="cursor-pointer"
              onClick={() => copyToClipboard(textMemo)}
            >
              <IconMdiContentCopy />
            </span>
          </When>
        </div>
      </Tooltip>
    </>
  )
}
