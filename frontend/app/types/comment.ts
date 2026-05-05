import type { IUser } from "./user";

export interface IComment {
    _id: string;
    userId: IUser;
    postId: string;
    text: string;
    createdAt?: Date;
}