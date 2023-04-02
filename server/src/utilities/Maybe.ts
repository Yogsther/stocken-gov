const Nothing = Symbol('nothing')
type Nothing = typeof Nothing
type Maybe<T> = T | Nothing