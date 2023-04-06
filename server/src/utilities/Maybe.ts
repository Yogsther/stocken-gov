export const Nothing = Symbol('nothing')
export type Nothing = typeof Nothing
export type Maybe<T> = T | Nothing

export function isJust(monad: Maybe<any>): boolean  {
    return monad != Nothing
}

export function isNothing(monad: Maybe<any>): boolean  {
    return monad == Nothing
}