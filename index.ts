class Room {
  constructor(private id: string) { }

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

class RoomService {
  constructor(private readonly roomRepository: RoomRepository) { }

  public create(roomId: string) {
    const room = new Room(roomId)
    this.roomRepository.save(room)
  }

  public find(roomId: string) {
    const room = this.roomRepository.find(roomId)
    if (!room) throw new Error('404')
    return room
  }
}

const roomService = new RoomService(new RoomRepository())
roomService.create('mad-broadcast!')