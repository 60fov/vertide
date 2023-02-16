import { cn } from "@/utils/util"

interface Props {
    className?: string
}

export default function LineHeight(props: Props) {
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
                d="M7 18L8.5 14.4M17 18L15.5 14.4M8.5 14.4L12 6L15.5 14.4M8.5 14.4H15.5"
                strokeLinecap="round"
                strokeLinejoin="round" />
            <path
                d="M21 2H3"
                strokeLinecap="round"
                strokeLinejoin="round" />
            <path
                d="M21 22H3"
                strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}