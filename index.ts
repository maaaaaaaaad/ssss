type MyReturnType<T> = T extends string ? string[] : number[]

type X = MyReturnType<string> // []string
type Y = MyReturnType<number> // []int

const x: X = ["a", "b", "c"]
const y: Y = [1, 2, 3]

console.log("x:", x, "y:", y)