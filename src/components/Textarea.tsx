import { useEffect, useRef, useState } from "react";

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

export default function Editor(props: Props) {
    const {
        value: valueProp,
        writingMode,
        initialValue = "안녕 👋",
        firstLineIndent = 0,
        lineHeight = "auto",
        letterSpacing = 0,
        className
    } = props;

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
                letterSpacing: `${letterSpacing}px`
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
}