import { PropsWithChildren, HTMLAttributes } from "react"
import { FlexColumn } from "../layouts/Flex"

export const MusicSectionLayout = (
    props: PropsWithChildren<{ title: string } & HTMLAttributes<HTMLElement>>,
) => {
    const { children, title, ...rest } = props
    return (
        <FlexColumn
            style={{
                gap: 30,
                // backgroundColor: 'rgba(255, 255, 255, .1)',
            }}
            {...rest}
        >
            <div className="__section__header">
                <h1
                    style={{
                        fontSize: '1.3rem',
                        color: 'white',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                    }}
                >
                    {title}
                </h1>
            </div>

            <div className="__section__content">{children}</div>
        </FlexColumn>
    )
}