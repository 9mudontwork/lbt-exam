import { cx } from '@emotion/css'

interface Props {
  width?: string
  height?: string
}

export const Skeleton: React.FC<Props> = ({
  width = 'w-full',
  height = 'h-3',
}: Props) => {
  return (
    <div className={width}>
      <div className="relative space-y-5 overflow-hidden bg-white/5 before:absolute before:inset-0 before:-translate-x-full before:-skew-x-12 before:animate-[shimmer_2s_infinite] before:border-t before:border-white/10 before:bg-gradient-to-r before:from-transparent before:via-black/30 before:to-transparent">
        <div className={cx('w-full rounded-lg bg-black/10', height)}></div>
      </div>
    </div>
  )
}
