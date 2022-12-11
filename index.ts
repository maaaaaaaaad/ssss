{
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
  console.clear()
}
{
  interface Props<T, K> {
    name: T
    age: K
  }
  function test({ name, age }: Props<string, number>): Props<string, number> {
    return { name, age }
  }
  const result = test({ name: 'mad', age: 1 })
  console.log(result)
  console.clear()
}