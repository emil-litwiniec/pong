import { v4 } from 'uuid';
import { Room } from './room';

export class RoomsMenager {
  public rooms = new Map<string, Room>();

  public open(sessionId: string) {
    const room = new Room();
    room.join({
      name: '',
      id: sessionId,
    });

    this.rooms.set(room.id, room);

    return room.id;
  }

  public join(sessionId: string) {
    const existingRoom = this.getRoomByPlayerId(sessionId);

    if (existingRoom) {
      return existingRoom.id;
    }

    const roomToJoin = Array.from(this.rooms.values()).find(
      (room) => room.canBeJoined
    );

    return roomToJoin
      ? roomToJoin.join({
          name: '',
          id: sessionId,
        })
      : this.open(sessionId);
  }

  public leave(sessionId: string) {
    const room = this.getRoomByPlayerId(sessionId);

    if (!room) return;

    if (room.isEmpty) {
      this.rooms.delete(room.id);
    } else {
      room.leave(sessionId);
    }
  }

  private getRoomByPlayerId(playerId: string) {
    const room = Array.from(this.rooms.values()).find((r) =>
      r.hasPlayer(playerId)
    );

    return room;
  }
}
