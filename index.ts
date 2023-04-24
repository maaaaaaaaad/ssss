class Person {
  constructor(private name: string) { }

  get personName() {
    return this.name
  }

  set personName(name: string) {
    this.name = name
  }
}

class Mad extends Person {
  constructor(name: string) {
    super(name)
  }
}

const mad = new Mad('mad')
const getName = mad.personName
console.log(getName)
mad.personName = 'integral'
const changeName = mad.personName
console.log(changeName)