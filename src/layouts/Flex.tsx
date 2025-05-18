import {
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from 'react'

export interface IFlexLayout extends HTMLAttributes<HTMLDivElement> {}

const FlexColumn = forwardRef(
  (
    props: PropsWithChildren<IFlexLayout>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { children, style, ...rest } = props
    return (
      <FlexLayout
        ref={ref}
        {...rest}
        style={{ ...style, flexDirection: 'column' }}
      >
        {children}
      </FlexLayout>
    )
  },
)

const FlexCenter = (props: PropsWithChildren<IFlexLayout>) => {
  const { children, style, ...rest } = props
  return (
    <FlexLayout
      {...rest}
      style={{ ...style, justifyContent: 'center', alignItems: 'center' }}
    >
      {children}
    </FlexLayout>
  )
}

const FlexLayout = forwardRef(
  (
    props: PropsWithChildren<IFlexLayout>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { children, style, ...rest } = props
    return (
      <div ref={ref} style={{ ...style, display: 'flex' }} {...rest}>
        {children}
      </div>
    )
  },
)

export { FlexColumn, FlexLayout, FlexCenter }
