import { cn } from "@/utils/util"
import { type ReactNode, type ReactElement, type ReactEventHandler } from "react"

interface Props<T extends string> {
    value?: T
    setValue: (value: T) => void
    className?: string
    children: ReactElement<OptionProps<T>>[] | ReactElement<OptionProps<T>>
}

const Base = <T extends string>(props: Props<T>) => {
    const {
        setValue,
        className,
        children
    } = props

    const handleSelect: ReactEventHandler<HTMLSelectElement> = (e) => {
        setValue(e.currentTarget.value as T)
    }

    return (
        <select
            // value={value}
            onInput={handleSelect}
            className={cn(
                "flex gap-2",
                className
            )}>
            {children}
        </select>
    )
}

interface OptionProps<T extends string> {
    value: T
    children?: ReactNode
    className?: string

}

export const Option = <T extends string>(props: OptionProps<T>) => {
    const {
        value,
        className,
        children = value,
    } = props
    return (
        <option
            value={value}
            className={cn(
                "",
                className
            )}>
            {children}
        </option>
    )
}

const Select = { Base, Option }
export default Select