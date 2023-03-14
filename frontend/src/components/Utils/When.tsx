import { isEmpty } from 'lodash-es'

interface Props extends React.PropsWithChildren {
  is?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  has?: any
}

export const When: React.FC<Props> = ({ children, is, has }: Props) => {
  if (is || !isEmpty(has)) return <>{children}</>

  return null
}
