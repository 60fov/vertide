import { cn } from "@/utils/util";
import { useRef, useState } from "react";
import HorizontalRtl from "./icons/HorizontalLtr";
import LetterSpacing from "./icons/LetterSpacing";
import LineHeight from "./icons/LineHeight";
import VerticalIndent from "./icons/VerticalIdent";
import VerticalRtl from "./icons/VerticalRtl";
import Textarea, { TextareaHandle, type WritingMode } from "./Textarea";
import NumberField from "./ui/NumberField";
import ToggleGroup from "./ui/ToggleGroup";

interface Props {
    value?: string
    initialValue?: string
}

/*
    TODO: ToggleGroup on state not rendering
*/

const sampleText = "세계를 향한 대화, 유니코드로 하십시오. 제10회 유니코드 국제 회의가 1997년 3월 10일부터 12일까지 독일의 마인즈에서 열립니다. 지금 등록하십시오. 이 회의에서는 업계 전반의 전문가들이 함께 모여 다음과 같은 분야를 다룹니다. - 인터넷과 유니코드, 국제화와 지역화, 운영 체제와 응용 프로그램에서 유니코드의 구현, 글꼴, 문자 배열, 다국어 컴퓨팅."

export default function Editor(props: Props) {
    const {
    } = props;

    const textareaRef = useRef<TextareaHandle>(null)
    
    const [firstLineIndent, setFirstLineIndent] = useState(0)
    const [lineHeight, setLineHeight] = useState(100)
    const [letterSpacing, setLetterSpacing] = useState(0)
    const [writingMode, setWritingMode] = useState<WritingMode>("vertical-rl")

    return (
        <div className="p-8 h-full grid [grid-template-rows:minmax(0,1fr)_min-content] gap-4 overflow-hidden">
            <div className="flex border-b-black/5 border-b pb-8">
                <Textarea
                    ref={textareaRef}
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
            <div className="flex gap-4 items-center justify-end px-2">
                <button 
                className="rounded-lg bg-neutral-200 h-full px-3 hover:bg-neutral-300 active:bg-neutral-200/50 transition-colors"
                onClick={() => textareaRef.current?.setText(sampleText)}>
                    sample text
                </button>
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
        <>
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

            <div className="h-6 w-[1px] bg-black/10" />

            <NumberField
                icon={<VerticalIndent />}
                className="w-24"
                min={0}
                max={100}
                value={firstLineIndent}
                onValueChange={setFirstLineIndent} />

            <NumberField
                icon={<LetterSpacing />}
                className="w-24"
                value={letterSpacing}
                defaultValue={0}
                min={-0.25}
                max={2}
                step={0.01}
                onValueChange={setLetterSpacing} />

            <NumberField
                icon={<LineHeight />}
                className="w-24"
                value={lineHeight}
                defaultValue={150}
                min={80}
                max={300}
                threshold={1}
                step={1}
                onValueChange={setLineHeight} />
        </>
    )
}