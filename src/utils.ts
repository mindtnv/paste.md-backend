import {Repository} from "typeorm";
import {NoteEntity} from "./NoteEntity";

export const getNoteById = async (id: string, repository: Repository<NoteEntity>) => {
    const notes = await repository.find({
        where: {
            id: Buffer.from(id, "base64url").toString("ascii"),
        },
        take: 1,
    });

    return notes.length > 0 ? notes[0] : null;
}

export const getBody = <T>(body: any) => {
    if (typeof body === "string")
        return JSON.parse(body) as T;

    if (typeof body === "object")
        return body as T;
    
    throw new Error(`Body type ${typeof body} not supported!`);
}