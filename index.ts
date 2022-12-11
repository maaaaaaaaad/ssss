type Candidates = 'mad1' | 'mad2' | 'mad3'
type Attributes = {
  name: string
  age: number
  location: string
}
type Members = Record<Candidates, Attributes>

const members: Members = {
  mad1: {
    name: 'mad1',
    age: 1,
    location: 'x'
  },
  mad2: {
    name: 'mad2',
    age: 2,
    location: 'y'
  },
  mad3: {
    name: 'mad3',
    age: 3,
    location: 'z'
  }
}

const getValues = <Members, K extends keyof Members>(obj: Members, key: K): Members[K] => obj[key] 

console.log(getValues(members, 'mad2'))