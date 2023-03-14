import { cx } from '@emotion/css'

export type BadgeColorsT =
  | 'red'
  | 'green'
  | 'blue'
  | 'gray'
  | 'yellow'
  | 'amber'

interface BadgeProps
  extends React.PropsWithChildren<React.HtmlHTMLAttributes<HTMLSpanElement>> {
  color: BadgeColorsT
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color,
}: BadgeProps) => {
  const classes = {
    base: 'mr-2 rounded border px-2.5 py-0.5 text-xs font-medium',
    color: {
      red: 'border-red-400 bg-red-100 text-red-800',
      green: 'border-green-400 bg-green-100 text-green-800',
      blue: 'border-blue-400 bg-blue-100 text-blue-800',
      gray: 'border-gray-400 bg-gray-100 text-gray-800',
      yellow: 'border-yellow-400 bg-yellow-100 text-yellow-800',
      amber: 'border-amber-400 bg-amber-100 text-amber-800',
    },
  }

  return (
    <>
      <span className={cx(classes.base, classes.color[color])}>{children}</span>
    </>
  )
}
