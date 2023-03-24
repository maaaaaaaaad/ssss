type Person = {
  readonly name: string;
  location: string;
}

type Equal<T,K> =
(()=>A extends T ? true:false) extends (()=>B extends K ? true:false)
? true
: false

type GetReadonlyKeys = keyof {
[K in keyof T as Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true
? K
: never]: T[K]
}

const readonlyName: ExtractReadonly = {
  name: 'mad',
  location: 'we'
}

console.log(readonlyName)