import { createContext, useContext } from "react";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// yoink'd from shadecn, ty!
// https://github.com/shadcn/taxonomy/blob/0bace50fcac775e7214eab01c96f7fea90d48e8c/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function createCtx<A extends unknown | null>() {
    const ctx = createContext<A | undefined>(undefined);
    function useCtx() {
        const c = useContext(ctx);
        if (c === undefined)
            throw new Error("useCtx must be inside a Provider with a value");
        return c;
    }
    return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}

export const maths = {
    clamp: (a: number, min: number, max: number): number => {
        return a >= max ? max : a <= min ? min : a
    }
}