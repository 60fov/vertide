import { cn } from "@/utils/util"

interface Props {
    className?: string
}

export default function HorizontalRtl(props: Props) {
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
                d="M0.5 1H12.5C12.5 1 15.5 1 15.5 4C15.5 7 12.5 7 12.5 7H3.5C3.5 7 0.5 7 0.5 10C0.5 13 3.5 13 3.5 13H15.5M15.5 13L13.5 15M15.5 13L13.5 11" />        </svg>
    )
}