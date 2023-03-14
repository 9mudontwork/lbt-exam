import { cx } from '@emotion/css'

type Props = React.HTMLAttributes<HTMLDivElement>

export const Container = ({ children, className }: Props) => {
  return (
    <>
      <div
        className={cx('relative mx-auto w-full max-w-screen-xl p-4', className)}
      >
        {children}
      </div>
    </>
  )
}
