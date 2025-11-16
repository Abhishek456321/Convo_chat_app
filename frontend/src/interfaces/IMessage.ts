export interface IMessage {
  sender: string;
  receiver: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
