import { cx } from '@emotion/css'

type Props = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ children, className }: Props) => {
  return (
    <>
      <div
        className={cx(
          'w-full rounded-lg border border-gray-200 bg-white p-3 shadow-md',
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
