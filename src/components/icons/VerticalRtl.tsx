import { cn } from "@/utils/util"

interface Props {
    className?: string
}

export default function VerticalRtl(props: Props) {
    const { className } = props

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            strokeWidth={1}
            stroke="currentColor"
            className={cn("w-4 h-4", className)}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 0.5L15 12.5C15 12.5 15 15.5 12 15.5C9 15.5 9 12.5 9 12.5V3.5C9 3.5 9 0.5 6 0.5C3 0.5 3 3.5 3 3.5L3 15.5M3 15.5L1 13.5M3 15.5L5 13.5" />
        </svg>
    )
}