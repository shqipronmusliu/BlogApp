import { ObjectId } from "mongodb";

export interface Blog {

    _id?: ObjectId;
    title: string;
    body: string;
    userEmail: string;
    createdAt?: Date;
}
