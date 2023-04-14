class Member {
  constructor(id) {
    this.id = id;
  }
  get member() {
    return this.id;
  }
  set member(id) {
    this.id = id;
  }
}
class Room {
  constructor(id) {
    this.id = id;
  }
  get room() {
    return this.id;
  }
  set room(id) {
    this.id = id;
  }
}
const mad = new Member("OH");
console.log(mad.member);
mad.member = "mad";
console.log(mad.member);
//# sourceMappingURL=index.js.map
