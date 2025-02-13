export type WsMessageType = 'input' | 'join' | 'leave';

export type WsMessageBase<
  Type extends WsMessageType,
  Data extends object = object
> = {
  type: Type;
  data: Data;
};

export type WsMessageInput = WsMessageBase<
  'input',
  {
    playerPosition: {
      x: number;
    };
  }
>;
export type WsMessageJoin = WsMessageBase<
  'join',
  {
    roomId?: string;
  }
>;
export type WsMessageLeave = WsMessageBase<'leave'>;

export type WsMessage = WsMessageInput | WsMessageJoin | WsMessageLeave;
