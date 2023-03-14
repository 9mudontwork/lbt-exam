import { cx } from '@emotion/css'

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  const classes = {
    base: 'leading-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm',
    color: 'text-white bg-blue-700',
    hover: 'hover:bg-blue-800',
    size: 'px-5 py-3.5',
    disabled: props.disabled && 'cursor-not-allowed !text-gray-400 !bg-sky-100',
  }

  return (
    <>
      <button
        className={cx(
          classes.base,
          classes.color,
          classes.hover,
          classes.size,
          classes.disabled,
          className
        )}
        type="button"
        {...props}
      >
        {children}
      </button>
    </>
  )
}
