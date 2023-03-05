import { cn, maths } from "@/utils/util"
import React, { type ReactNode, useState, useRef, useEffect } from "react"

interface Props {
    defaultValue?: number
    value?: number
    onValueChange?: (v: number) => void
    min?: number
    max?: number
    step?: number
    threshold?: number
    icon?: ReactNode
    placeholder?: string
    className?: string
}

interface Delta {
    accum: number
    threshold: number
}

export default function NumberField(props: Props) {
    const {
        value: valueProp,
        defaultValue: defaultValueProp,
        onValueChange = () => ({}),
        min,
        max,
        step = 1,
        threshold = 3,
        icon,
        placeholder,
        className
    } = props


    const dragRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const deltaRef = useRef<Delta>({ accum: 0, threshold })

    const defaultValue = defaultValueProp ?? min ?? 0

    const [dragging, setDragging] = useState(false)
    const [valueState, setValueState] = useState(defaultValue)

    useEffect(() => {
        if (inputRef.current) inputRef.current.value = `${defaultValue}`
    }, [])

    function setValue(value: number) {
        if (valueProp !== undefined) {
            onValueChange(value)
        } else {
            setValueState(value)
        }
        if (inputRef.current) inputRef.current.value = `${value}`
    }

    function getInputValue(input: HTMLInputElement) {
        const v = input.valueAsNumber
        if (isNaN(v)) {
            return defaultValue
        }
        return maths.clamp(v, min ?? -Infinity, max ?? Infinity)
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") {
            const newValue = getInputValue(e.currentTarget)
            setValue(newValue)
        }
    }

    const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        const newValue = getInputValue(e.currentTarget)
        setValue(newValue)
    }

    const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!dragRef.current) return
        dragRef.current.setPointerCapture(e.pointerId)
        setDragging(true)
    }

    // TODO: onPointerUp sometimes doesn't fire not sure why so onLostPointerCapture is a second check
    const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!dragRef.current) return
        dragRef.current.releasePointerCapture(e.pointerId)
        setDragging(false)
    }

    const onLostPointerCapture: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (dragRef.current) dragRef.current.releasePointerCapture(e.pointerId)
        setDragging(false)
    }

    const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!dragging) return

        deltaRef.current.accum += e.movementX
        const delta = Math.floor(deltaRef.current.accum / deltaRef.current.threshold)
        deltaRef.current.accum = deltaRef.current.accum % deltaRef.current.threshold

        const value = valueProp ?? valueState
        const newValue = maths.clamp((value || 0) + delta * step, min ?? -Infinity, max ?? Infinity)
        setValue(newValue)
    }

    return (
        <div
            className={cn(
                "flex gap-1 items-center p-2 rounded",
                "outline outline-1 bg-neutral-200 outline-black/5 focus-within:outline-black/50",
                className
            )}>
            <div
                tabIndex={-1}
                ref={dragRef}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerMove={onPointerMove}
                onLostPointerCapture={onLostPointerCapture}
                className={cn(
                    "cursor-ew-resize",
                    "outline-none"
                )}>
                {icon}
            </div>
            <input
                ref={inputRef}
                className={cn(
                    "w-full",
                    "bg-transparent outline-none",
                )}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                type="number"
                placeholder={placeholder} />
        </div>
    )
}