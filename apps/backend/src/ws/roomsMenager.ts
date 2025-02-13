import { v4 } from 'uuid';

export class RoomsMenager {
  public rooms = new Map<string, string[]>();

  public open(sessionId: string) {
    const roomId = v4();
    this.rooms.set(roomId, [sessionId]);

    return roomId;
  }

  private _join(sessionId: string, roomId: string) {
    const room = this.rooms.get(roomId);

    this.rooms.set(roomId, [...room, sessionId]);
    return roomId;
  }

  public join(sessionId: string) {
    const existingRoom = this.findRoomBySessionId(sessionId);
    if (existingRoom) {
      return existingRoom[0];
    }
    const roomToJoin = Array.from(this.rooms.entries()).find(
      ([, sessionIds]) => sessionIds.length === 1
    );

    return roomToJoin
      ? this._join(sessionId, roomToJoin[0])
      : this.open(sessionId);
  }

  public leave(sessionId: string) {
    const room = this.findRoomBySessionId(sessionId);

    if (!room) return;

    const [roomId, sessionIds] = room;

    if (sessionIds.length === 1) {
      this.rooms.delete(roomId);
    } else {
      this.rooms.set(
        roomId,
        sessionIds.filter((id) => id !== sessionId)
      );
    }
  }

  private findRoomBySessionId(sessionId: string) {
    const room = Array.from(this.rooms.entries()).find(([, sessionIds]) =>
      sessionIds.includes(sessionId)
    );

    return room;
  }
}
