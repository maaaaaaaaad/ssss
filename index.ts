class Room {
  constructor(private id: string) { }

  public get room() {
    return this.id
  }

  public set room(id: string) {
    this.id = id
  }
}