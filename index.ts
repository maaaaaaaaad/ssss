class Room {
  constructor(private id: string) { }

  public get RoomId() {
    return this.id
  }

  public set RoomId(id: string) {
    this.id = id
  }
}

class RoomRepository {
  private rooms: Map<string, Room> = new Map<string, Room>()

  public save(room: Room): void {
    this.rooms.set(room.RoomId, room)
  }

  public find(roomId: string): Room | undefined {
    return this.rooms.get(roomId)
  }
}

class RoomService { }