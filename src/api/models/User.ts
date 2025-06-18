import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId | string;
    name: string;
    email: string;
    password?: string;
    role?: string;
    createdAt?: Date;
}