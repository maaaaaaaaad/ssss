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
{
  interface Props<T, K> {
    name: T,
    age: K
  }
  function test<G = string, H = number>({ name, age }: Props<G, H>): Props<G, H> {
    return { name, age }
  }
  const result = test({ name: 'okok', age: '1' })
  console.log(result)
  console.clear()
}
{
  type Props<A, B> = {
    name: A,
    age: B
  }
  type InnerType<C = string, D = string> = Props<C, D>
  function test({ name, age }: InnerType): InnerType {
    return { name, age }
  }
  const output = test({ name: 'mad', age: '1' })
  type Result = ReturnType<typeof test>
  const result: Result = output
  console.log(result)
  console.clear()
}
{
  type X<Type> = { readonly [Property in keyof Type]: Type[Property] }
  type Y = { readonly name: string, readonly age: number }
  const user: X<Y> = { name: 'mad', age: 1 }
  console.log(user)
  console.clear()
}
{
  type Members = 'mad' | 'integral'
  type Result = `account_id: ${Members}`
  const mad: Result = 'account_id: mad'
  const integral: Result = 'account_id: integral'
  console.log(mad)
  console.log(integral)
  console.clear()
}
{
  type SignUpType = {
    readonly kind: 'sign_up'
    password?: string
    confirmPassword?: string
  }

  type SignInType = {
    readonly kind: 'sign_in'
    password?: string
  }

  type Middleware = SignInType | SignUpType

  function middleware(sign: Middleware): SignUpType | SignInType | void {
    switch (sign.kind) {
      case 'sign_up':
        delete sign.password
        delete sign.confirmPassword
        return sign
      case 'sign_in':
        delete sign.password
        return sign
      default:
        break
    }
  }

  const signUp = middleware({ kind: 'sign_up', password: '123', confirmPassword: '123' })
  const signIn = middleware({ kind: 'sign_in', password: '123' })
  console.log('sign_up: ', signUp)
  console.log('sign_in: ', signIn)
  console.clear()
}
{
  class Person {
    protected readonly name = 'mad'
    protected test() {
      return 'mad'
    }
  }
  class Mad extends Person {
    public output() {
      return this.name + 'hello!'
    }
  }
  const mad = new Mad()
  const output = mad.output()
  console.log(output)
  console.clear()
}
{
  interface PersonInterface {
    readonly accountId: string
  }
  interface NicknameInterface {
    readonly nickname: string
  }
  interface MadInterface<T> {
    readonly result: ({ nickname }: NicknameInterface) => T
  }
  class Person {
    protected accountId({ accountId }: PersonInterface): PersonInterface {
      return { accountId }
    }
  }
  class Mad extends Person implements MadInterface<{ nickname: string, accountId: string }> {
    public result({ nickname }: NicknameInterface) {
      return { ...this.accountId({ accountId: 'mad' }), nickname }
    }
  }
  const mad = new Mad()
  const result = mad.result({ nickname: 'ninini' })
  console.log(result)
  console.clear()
}
{
  function gogo<T, L>(arr: T[], func: (args: T) => L): L[] {
    return arr.map(func)
  }
  const result = gogo(["1", "2", "3", "4"], (i) => parseInt(i))
  console.log(result)
  console.clear()
}
{
  type Attribute = {
    name: string
    age: number
  }
  function updateUserData(insert: Required<Attribute>, update: Partial<Attribute>): Attribute {
    return { ...insert, ...update }
  }
  const user: Required<Attribute> = {
    name: 'mad',
    age: 1
  }
  const updateProfile = updateUserData(user, { age: 3 })
  console.log(updateProfile)
  console.clear()
}
{
  class Animal {
    constructor(public name: string) { }
  }
  class Lion extends Animal {
    constructor(public readonly name: string) {
      super(name)
    }
    public greeting() {
      return this.name
    }
  }
  const lion = new Lion('lion')
  console.log(lion.greeting())
  console.clear()
}
{
  class Thing {
    _size = 0

    get size(): number {
      return this._size
    }

    set size(value: string | number | boolean) {
      let num = Number(value)
      if (!Number.isFinite(num)) {
        this._size = 0
        throw new Error('value has no type number')
      }
      this._size = num
    }
  }

  const thing = new Thing()
  thing.size = '10'
  const getter = thing.size
  console.log('getter: ', getter)
  console.clear()
}
{
  function transform<T, K>(arr: T[], func: (args: T) => K): K[] {
    return arr.map(func)
  }
  const elements = [1, "2", "3", 4, "5"]
  const result = transform(elements, (el) => {
    if (typeof el === 'string') {
      console.log(el)
      Number(el)
      console.log(typeof el)
    }
    return el
  })
  console.log(result)
  console.clear()
}
{
  class Person {
    constructor(protected name: string) { }
  }
  class Mad extends Person {
    constructor(name: string, private message: string) {
      super(name)
    }

    set setName(name: string) {
      this.name = name
    }

    set setMessage(message: string) {
      this.message = message
    }

    get greeting(): string {
      return `name: ${this.name}, message: ${this.message}`
    }
  }
  const mad = new Mad('mad', 'hello world')
  console.log(mad.greeting)
  mad.setName = 'integral'
  mad.setMessage = 'welcome to the jungle'
  console.log(mad.greeting)
  console.clear()
}