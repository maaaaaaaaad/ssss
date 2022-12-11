function iter<T>(arr: Iterable<T>): T[] {
  return [...arr]
}

const result = iter([1, 2, 3, 4])
console.log(result)

function anyTest(anyArr: any): any {
  return anyArr
}

const anyResult = anyTest([1, 2, 3, 4])
console.log(anyResult)