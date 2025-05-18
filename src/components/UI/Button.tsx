import { clsx } from 'clsx'

const Button = (
  props: any,
) => {
  const { _type, className, children, ...rest } = props
  return (
    <button className={clsx('btn', className)} {...rest}>
      {children}
    </button>
  )
}

export default Button
