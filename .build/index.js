class Room {
  constructor(id) {
    this.id = id;
  }
  set RoomId(id) {
    this.id = id;
  }
}
class RoomRepository {
  rooms = new Map();
  save(room) {
    this.rooms.set(room.RoomId, room);
    console.log(this.rooms.get(room.RoomId));
  }
  find(roomId) {
    return this.rooms.get(roomId);
  }
}
class RoomService {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }
  create(roomId) {
    const room = new Room(roomId);
    this.roomRepository.save(room);
  }
  find(roomId) {
    const room = this.roomRepository.find(roomId);
    if (!room)
      throw new Error("404");
    return room;
  }
}
const roomService = new RoomService(new RoomRepository());
roomService.create("mad-broadcast!");
//# sourceMappingURL=index.js.map
