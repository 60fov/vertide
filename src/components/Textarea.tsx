import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export const WritingModeList = ["horizontal-tb", "vertical-rl", "vertical-lr", "sideways-rl", "sideways-lr"] as const
export type WritingMode = typeof WritingModeList[number]

interface Props {
    value?: string
    writingMode?: WritingMode
    initialValue?: string
    firstLineIndent?: number
    lineHeight?: number
    letterSpacing?: number
    className?: string
}

/*
    TODO: handle value state correctly
*/

export interface TextareaHandle {
    setText: (text: string) => void
}

const Textarea = forwardRef<TextareaHandle, Props>(function Textarea(props, ref) {
    const {
        value: valueProp,
        writingMode,
        initialValue = "안녕 👋",
        firstLineIndent = 0,
        lineHeight = "auto",
        letterSpacing = 0,
        className
    } = props;


    useImperativeHandle(ref, () => {
        return {
            setText: (text: string) => {
                if (inputRef.current) inputRef.current.innerText = text
            }
        }
    })
    const inputRef = useRef<HTMLDivElement>(null)

    const [valueState, setValueState] = useState<string>(initialValue || "")
    const value = valueProp ?? valueState

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])

    useEffect(() => {
        if (inputRef.current) inputRef.current.innerText = value
    }, [value])

    return (
        <div
            ref={inputRef}
            className={className}
            style={{
                writingMode,
                textOrientation: "mixed",
                textIndent: `${firstLineIndent}px`,
                lineHeight: `${lineHeight}%`,
                letterSpacing: `${letterSpacing}em`
                // textCombineUpright: "all",
            }}
            onPaste={(e) => {
                e.preventDefault()
                setValueState(e.clipboardData.getData("text/plain"))
            }}
            lang="ko"
            contentEditable>
        </div>
    )
})

export default Textarea