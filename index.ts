type MyReturnType<T> = T extends string ? string[] : number[]

type X = MyReturnType<string> // []string
type Y = MyReturnType<number> // []int

const x: X = ["a", "b", "c"]
const y: Y = [1, 2, 3]

console.log("x:", x, "y:", y)

interface StringDataType<T extends boolean> {
  readonly data: T extends true ? string : number
  readonly message: T
}

const stringData: StringDataType<true> = {
  data: "mad",
  message: true
}

const stringErrorData: StringDataType<false> = {
  data: 1,
  message: false
}

console.log("ok:", stringData, "fail:", stringErrorData)