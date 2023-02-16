import { useDragDelta } from "@/utils/hooks"
import { cn, maths } from "@/utils/util"
import React, { type ReactNode, useState, useEffect, PointerEventHandler, useCallback, useRef, } from "react"

interface Props {
    onInput?: (value: number, event: React.FormEvent<HTMLInputElement>) => void
    value?: number
    setValue?: (v: number) => void
    initialValue?: number
    min?: number
    max?: number
    step?: number
    icon?: ReactNode

    // disabled?: boolean
    placeholder?: string

    className?: string
}

export default function NumberField(props: Props) {
    const {
        onInput: onInputProp,
        value: valueProp,
        setValue: setValueProp,
        initialValue,
        min,
        max,
        step,
        icon,
        // disabled,
        placeholder,
        className
    } = props

    const dragRef = useRef<HTMLDivElement>(null)

    // TODO: calculate initival from min max
    const [valueState, setValueState] = useState<number>(initialValue ?? 0)
    const [dragging, setDragging] = useState(false)
    const value = valueProp ?? valueState
    const setValue = setValueProp ?? setValueState

    const onInput: React.FormEventHandler<HTMLInputElement> = (e) => {
        // if (props.disabled) return
        const v = e.currentTarget.valueAsNumber
        const newValue = maths.clamp(v, min || -Infinity, max || Infinity)
        if (onInputProp) onInputProp(newValue, e)
    }

    const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        const v = e.currentTarget.valueAsNumber
        if (isNaN(v)) setValue(initialValue || 0)
    }

    const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!dragRef.current) return
        dragRef.current.setPointerCapture(e.pointerId)
        setDragging(true)
        // dragRef.current.addEventListener("pointermove", onPointerMove)
    }
    const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!dragRef.current) return
        dragRef.current.releasePointerCapture(e.pointerId)
        setDragging(false)
        // dragRef.current.removeEventListener("pointermove", onPointerMove)
    }

    const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!dragging) return
        setValue((v) => {
            const newValue = maths.clamp(v + e.movementX, min ?? -Infinity, max ?? Infinity)
            // console.log(newValue)
            return newValue
        })
    }

    return (
        <div
            className={cn(
                "flex gap-1 items-center p-1 rounded-sm",
                "outline outline-1 outline-black/5 focus-within:outline-black/50",
                className
            )}>
            <div
                ref={dragRef}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerMove={onPointerMove}
                className={cn(
                    "cursor-ew-resize"
                )}>
                {icon}
            </div>
            <input
                className={cn(
                    "w-full",
                    "bg-transparent outline-none",
                )}
                onBlur={onBlur}
                onInput={onInput}
                // onChange={onChange}
                value={value}
                type="number"
                placeholder={placeholder} />
        </div>
    )
}