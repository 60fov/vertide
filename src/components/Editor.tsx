import { cn } from "@/utils/util";
import { useEffect, useRef, useState } from "react";
import HorizontalRtl from "./icons/HorizontalLtr";
import LetterSpacing from "./icons/LetterSpacing";
import LineHeight from "./icons/LineHeight";
import VerticalIndent from "./icons/VerticalIdent";
import VerticalRtl from "./icons/VerticalRtl";
import NumberField from "./ui/NumberField";
import ToggleGroup from "./ui/ToggleGroup";

interface Props {
    value?: string
    initialValue?: string
}

/*
    TODO: ToggleGroup on state not rendering
*/

type WritingMode = "horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr"

export default function Editor(props: Props) {
    const {
        initialValue
    } = props;

    const inputRef = useRef<HTMLDivElement>(null)

    const [value, setValue] = useState<string>(initialValue || "")
    const [firstLineIndent, setFirstLineIndent] = useState(0)
    const [lineHeight, setLineHeight] = useState(100)
    const [letterSpacing, setLetterSpacing] = useState(0)

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])

    useEffect(() => {
        if (inputRef.current) inputRef.current.innerText = value
    }, [value])

    const [dir, setDir] = useState<WritingMode>("vertical-rl")

    return (
        <div className="h-full max-w-2xl flex flex-col mx-auto">
            <div className="max-h-8 h-1/6" />

            <div
                ref={inputRef}
                className={cn(
                    "h-full p-8",
                    "rounded bg-neutral-50 shadow-md shadow-neutral-500/5",
                    "text-xl font-normal font-serif",
                    "tracking-tight outline-none overflow-scroll",
                )}
                style={{
                    writingMode: dir,
                    textOrientation: "mixed",
                    textIndent: `${firstLineIndent}px`,
                    lineHeight: `${lineHeight}%`,
                    letterSpacing: `${letterSpacing}px`
                    // textCombineUpright: "all",
                }}
                onPaste={(e) => {
                    e.preventDefault()
                    setValue(e.clipboardData.getData("text/plain"))
                }}
                lang="ko"
                contentEditable>
            </div>

            <div className="h-4" />

            <div className="flex gap-4 items-center px-2">

                <button
                    className="px-2 py-1 bg-neutral-200/50 rounded border-neutral-500/5 border hover:bg-neutral-200 active:translate-y-[1.5px] transition-all"
                    onClick={() => setValue(long_snippet)}>
                    long text
                </button>
                <button
                    className="px-2 py-1 bg-neutral-200/50 rounded border-neutral-500/5 border hover:bg-neutral-200 active:translate-y-[1.5px] transition-all"
                    onClick={() => setValue(short_snippet)}>
                    short text
                </button>
                <div className="h-6 w-[1px] bg-black/10" />
                <ToggleGroup.Base
                    name="direction"
                    prompt="select text direction"
                    value={dir}
                    setValue={setDir}>
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
                    className="w-16"
                    value={firstLineIndent}
                    setValue={setFirstLineIndent} />
                <NumberField
                    icon={<LetterSpacing />}
                    className="w-16"
                    value={letterSpacing}
                    setValue={setLetterSpacing} />
                <NumberField
                    icon={<LineHeight />}
                    className="w-16"
                    min={0}
                    value={lineHeight}
                    setValue={setLineHeight} />
            </div>
        </div>
    )
}

const short_snippet = `새해 복 많이 받으세요! 새해를 맞아 가족, 친구, 동료들에게 이 메시지를 전하며 새해의 축복을 나눌 수 있습니다. 한국에서는 새해에는 가족이 모여 떡국을 먹으면서 함께 시간을 보내는 것이 전통입니다.`

const long_snippet = `당신의 건강은 매우 중요합니다. 혈압, 혈당, 콜레스테롤과 같은 지표들은 건강상태를 나타내는 중요한 요소입니다. 이 앱은 당신의 건강을 관리하는 데 도움을 줄 수 있습니다. 먼저, 당신의 건강지표를 입력하면 이 앱은 당신의 건강상태를 쉽게 파악할 수 있습니다. 예를 들어, 혈압이 120/80 이상이면 건강하다는 것을 의미합니다. 그리고 이 앱은 당신이 목표로 하는 건강지표와 실제 건강지표의 차이를 보여줄 것입니다. 이렇게 하면 당신은 건강에 대한 정확한 정보를 얻을 수 있고, 이를 토대로 건강한 삶을 살아갈 수 있습니다.
또한, 이 앱은 당신이 건강을 유지하기 위한 운동 및 식단 추천도 제공합니다. 예를 들어, 당신이 하루에 10,000 걸음 이상 걷는 것이 좋다는 것을 알고 계셨나요? 이 앱은 걷기, 달리기, 자전거타기 등의 운동 추천도 제공하며, 영양가 높은 과일과 채소, 단백질, 탄수화물 등을 함유한 식단도 제공합니다. 이 앱은 당신이 건강한 삶을 위한 팁과 정보도 제공합니다. 예를 들어, 수면 부족은 건강에 좋지 않다는 것을 알고 계셨나요? 이 앱은 건강한 수면 습관에 대한 정보도 제공합니다.
이 앱을 사용하여 당신의 건강을 관리하고, 더욱 건강하고 행복한 삶을 살아보세요!`