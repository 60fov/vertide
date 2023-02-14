import { cn } from "@/utils/util"
import React, { type ReactNode, useState } from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    on?: boolean
    onToggle?: (on: boolean) => void
    children?: ReactNode
}

export default function Toggle(props: Props) {
    const {
        on: onProp,
        onToggle: onToggleProp,
        children,
        ...restProps
    } = props

    const [onState, setOnState] = useState<boolean>(onProp ?? false)
    const on = onProp ?? onState

    const onToggle: React.MouseEventHandler = () => {
        if (restProps.disabled) return
        const newOn = !on
        if (onToggleProp) onToggleProp(newOn)
        if (onProp === undefined) setOnState(newOn)
    }

    return (
        <button
            className={cn(
                "p-2 rounded opacity-25 border border-transparent transition-opacity",
                "data-[on=true]:opacity-75"
            )}
            data-on={on}
            onClick={onToggle}
            {...restProps}>
            {children}
        </button>
    )
}