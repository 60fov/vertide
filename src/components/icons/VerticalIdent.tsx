import { cn } from "@/utils/util"

interface Props {
    className?: string
}

export default function VerticalIndent(props: Props) {
    const { className } = props

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className={cn("w-4 h-4", className)}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 10V22M14 5V22M9 5V22M4 5V22M19 8L21 5.5M19 8L17 5.5M19 8V2" />
        </svg>
    )
}