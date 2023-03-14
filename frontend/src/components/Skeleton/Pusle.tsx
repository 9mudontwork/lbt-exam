import { cx } from '@emotion/css'

interface Props {
  width?: string
  height?: string
}

export const SkeletonPulse: React.FC<Props> = ({
  width = 'w-full',
  height = 'h-3',
}: Props) => {
  return (
    <div className={cx('animate-pulse-1.2', width)}>
      <div className={cx('w-full rounded-lg bg-gray-300', height)}></div>
    </div>
  )
}
