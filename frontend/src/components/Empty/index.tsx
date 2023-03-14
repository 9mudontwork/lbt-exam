import { cx } from '@emotion/css'
import { IconMdiInbox } from '../Utils/Icon'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

export const Empty: React.FC<Props> = ({
  className,
  title = 'No Data',
}: Props) => {
  return (
    <>
      <div
        className={cx(
          'grid h-full w-full place-content-center py-10',
          className
        )}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-gray-300">
          <IconMdiInbox className="text-4xl" />
          <span>{title}</span>
        </div>
      </div>
    </>
  )
}
