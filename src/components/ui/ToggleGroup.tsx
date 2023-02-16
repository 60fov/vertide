import { cn, createCtx } from "@/utils/util"
import { type ReactNode, type ReactElement } from "react"

interface ToggleGroupContextInterface {
    name: string
    value: unknown
}

const [useMultiToggleContext, MultiToggleProvider] = createCtx<ToggleGroupContextInterface>()

interface Props<T extends string> {
    name: string
    prompt: string
    value: T
    setValue: (value: T) => void
    className?: string
    children: ReactElement<ItemProps<T>>[] | ReactElement<ItemProps<T>>
}

const Base = <T extends string>(props: Props<T>) => {
    const {
        name,
        prompt,
        value,
        setValue,
        className,
        children
    } = props

    const handleChange: React.FormEventHandler<HTMLFieldSetElement> = (e) => {
        const input = e.target as HTMLInputElement
        setValue(input.value as T)
    }

    return (
        <div className={"relative"}>
            <fieldset
                onChange={handleChange}
                className={cn(
                    "flex gap-2",
                    className
                )}>
                <legend className="absolute [clip:rect(0,0,0,0)]">{prompt}</legend>
                <MultiToggleProvider value={{ name, value }}>
                    {children}
                </MultiToggleProvider>
            </fieldset>
        </div>
    )
}

interface ItemProps<T extends string> {
    value: T
    children?: ReactNode
    className?: string

}

export const Item = <T extends string>(props: ItemProps<T>) => {
    const {
        value,
        className,
        children = value,
    } = props

    const { name: toggleName, value: toggleValue } = useMultiToggleContext()

    return (
        <div className="relative">
            <input
                className="peer appearance-none absolute"
                type="radio"
                name={toggleName}
                id={value}
                value={value}
                checked={toggleValue === value}
                readOnly={true} />
            <label
                data-selected={toggleValue === value}
                className={cn(
                    "text-neutral-900/25 peer-checked:text-neutral-900/90 transition-colors cursor-pointer",
                    className
                )}
                htmlFor={value}>
                {children}
            </label>
        </div>
    )
}

const ToggleGroup = { Base, Item }
export default ToggleGroup