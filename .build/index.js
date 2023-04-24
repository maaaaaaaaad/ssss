class Person {
  constructor(name) {
    this.name = name;
  }
  get personName() {
    return this.name;
  }
  set personName(name) {
    this.name = name;
  }
}
class Mad extends Person {
  constructor(name) {
    super(name);
  }
}
const mad = new Mad("mad");
const getName = mad.personName;
console.log(getName);
mad.personName = "integral";
const changeName = mad.personName;
console.log(changeName);
//# sourceMappingURL=index.js.map
