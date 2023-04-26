type Person = {
  name: string;
  age: string;
  location?: string;
};

type NonOptionalKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? K : never;
}[keyof T];

type NonOptionalFields<T> = {
  [K in NonOptionalKeys<T>]: T[K];
};

type RequiredPerson = NonOptionalFields<Person>;

const requiredPerson: RequiredPerson = {
  name: 'mad',
  age: '11',
}

console.log(requiredPerson)