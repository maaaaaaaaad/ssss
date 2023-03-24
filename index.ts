type CustomReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : T
type CustomPickType<T, K extends keyof T> = { [P in keyof T as P extends K ? K : never]: T[P] }