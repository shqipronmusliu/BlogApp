import clientPromise from "@/lib/mongodb";
import { User } from "@/api/models/User";
import { ObjectId } from "mongodb";
import { hash } from "bcryptjs"; 

const COLLECTION = "users";
const DB_NAME = "blog-app";

export async function getAllUsers(): Promise<Omit<User, "password">[]> {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db
        .collection<User>(COLLECTION)
        .find({}, { projection: { password: 0 } })
        .toArray();
}

export async function getUserForAuth(email: string): Promise<User | null> {
    const client = await clientPromise;
    return client
        .db(DB_NAME)
        .collection<User>(COLLECTION)
        .findOne({ email });            
}

export async function createUser(data: User): Promise<User> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const now = new Date();
  const { _id, ...rest } = data;

  const toInsert = {
    ...rest,
    createdAt: now,
    ...(_id ? { _id: new ObjectId(_id) } : {}),
  };

  const result = await db.collection(COLLECTION).insertOne(toInsert);
  return {
    _id: result.insertedId.toString(),
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: now,
  } as User;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db
    .collection<User>(COLLECTION) 
    .findOne({ email }, { projection: { password: 0 } });
}

export async function getUserById(id: string): Promise<Omit<User, "password"> | null> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db
    .collection<User>(COLLECTION)
    .findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );
}

export async function updateUser(
    id: string,
    data: Partial<Pick<User, "name" | "password" | "role">>
    ): Promise<Omit<User, "password"> | null> {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const setFields: Partial<Record<keyof User, unknown>> = {};

    if (data.name !== undefined) {
        setFields.name = data.name;
    }

    if (data.role !== undefined) {
        setFields.role = data.role;
    }
    
    if (data.password) {
        setFields.password = await hash(data.password, 10);
    }

    const updateDoc = {
        $set: setFields
    };

    await db
    .collection(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, updateDoc);

    return getUserById(id);
}

export async function deleteUser(id: string): Promise<{ deletedCount: number }> {
  const client = await clientPromise;
  const db  = client.db(DB_NAME);

  const result = await db
    .collection(COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });

  return { deletedCount: result.deletedCount };
}
