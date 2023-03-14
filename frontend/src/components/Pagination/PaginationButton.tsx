import { cx } from '@emotion/css'

type Props = React.PropsWithChildren<
  React.HTMLAttributes<HTMLAnchorElement>
> & {
  active?: boolean
  disabled?: boolean
}

export const PaginationButton = ({
  children,
  className,
  active = false,
  disabled = false,
  ...props
}: Props) => {
  const classes = {
    base: 'border border-gray-300 bg-white text-gray-500 px-3 py-1 leading-none',
    hover: 'hover:bg-gray-100 hover:text-gray-700',
    active: active && 'z-10 !text-blue-600 !border-blue-300 !bg-blue-50 ',
    activeHover: active && 'hover:!bg-blue-100 hover:!text-blue-700',
    disable: disabled && 'text-gray-300 cursor-not-allowed',
  }

  return (
    <>
      <li>
        <a
          role="button"
          className={cx(
            classes.base,
            classes.hover,
            classes.active,
            classes.activeHover,
            classes.disable,
            className
          )}
          {...props}
        >
          {children}
        </a>
      </li>
    </>
  )
}
