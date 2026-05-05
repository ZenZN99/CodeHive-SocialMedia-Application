import type { IUser } from "./user";

export interface IReply {
  _id: string;
  userId: IUser;
  commentId: string;
  text: string;
}
