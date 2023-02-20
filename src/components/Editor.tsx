import { cn } from "@/utils/util";
import { useState } from "react";
import HorizontalRtl from "./icons/HorizontalLtr";
import LetterSpacing from "./icons/LetterSpacing";
import LineHeight from "./icons/LineHeight";
import VerticalIndent from "./icons/VerticalIdent";
import VerticalRtl from "./icons/VerticalRtl";
import Textarea, { type WritingMode } from "./Textarea";
import NumberField from "./ui/NumberField";
import ToggleGroup from "./ui/ToggleGroup";

interface Props {
    value?: string
    initialValue?: string
}

/*
    TODO: ToggleGroup on state not rendering
*/

export default function Editor(props: Props) {
    const {
    } = props;

    const [firstLineIndent, setFirstLineIndent] = useState(0)
    const [lineHeight, setLineHeight] = useState(100)
    const [letterSpacing, setLetterSpacing] = useState(0)
    const [writingMode, setWritingMode] = useState<WritingMode>("vertical-rl")

    return (
        <div className="p-8 h-full grid [grid-template-rows:minmax(0,1fr)_min-content] gap-4 overflow-hidden">
            <div className="flex border-b-black/5 border-b pb-8">
                <Textarea
                    firstLineIndent={firstLineIndent}
                    lineHeight={lineHeight}
                    letterSpacing={letterSpacing}
                    writingMode={writingMode}
                    className={cn(
                        "h-full flex-grow text-4xl leading-none font-bold font-sans",
                        "outline-none",
                        "break-words"
                    )} />
            </div>


            {/* <div className="h-4" />
            <div className="bg-black/10 h-[1px] w-full"/>
            <div className="h-4" /> */}

            {/* settings */}
            <Settings
                setFirstLineIndent={setFirstLineIndent}
                setLineHeight={setLineHeight}
                setLetterSpacing={setLetterSpacing}
                setWritingMode={setWritingMode}
                writingMode={writingMode}
                firstLineIndent={firstLineIndent}
                lineHeight={lineHeight}
                letterSpacing={letterSpacing} />
        </div>
    )
}

interface SettingsProps {
    setFirstLineIndent: (v: number) => void
    setLineHeight: (v: number) => void
    setLetterSpacing: (v: number) => void
    setWritingMode: (v: WritingMode) => void
    firstLineIndent: number
    lineHeight: number
    letterSpacing: number
    writingMode: WritingMode
}

function Settings(props: SettingsProps) {
    const {
        setFirstLineIndent,
        setLineHeight,
        setLetterSpacing,
        setWritingMode,
        firstLineIndent,
        lineHeight,
        letterSpacing,
        writingMode,
    } = props

    return (
        <div className="flex gap-4 items-center justify-end px-2">
            {/* <div className="h-6 w-[1px] bg-black/10" /> */}
            <ToggleGroup.Base
                name="direction"
                prompt="select text direction"
                value={writingMode}
                setValue={setWritingMode}>
                <ToggleGroup.Item
                    value="vertical-rl">
                    <VerticalRtl />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    value="horizontal-tb">
                    <HorizontalRtl />
                </ToggleGroup.Item>
            </ToggleGroup.Base>

            {/* <div className="h-6 w-[1px] bg-black/10" /> */}

            {/* <NumberField
                icon={<VerticalIndent />}
                className="w-16"
                value={firstLineIndent}
                setValue={setFirstLineIndent} /> */}

            {/* <NumberField
                icon={<LetterSpacing />}
                className="w-16"
                value={letterSpacing}
                setValue={setLetterSpacing} /> */}

            {/* <NumberField
                icon={<LineHeight />}
                className="w-16"
                min={0}
                value={lineHeight}
                setValue={setLineHeight} /> */}
        </div>
    )
}