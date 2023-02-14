import { cn } from "@/utils/util"

interface Props {
    className?: string
}

export default function RightAlign(props: Props) {
    const { className } = props

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={cn("w-4 h-4", className)}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
        </svg>
    )
}

