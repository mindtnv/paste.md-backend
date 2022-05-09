import {Repository} from "typeorm";
import {NoteEntity} from "./NoteEntity";

export const getNoteById = async (id: string, repository: Repository<NoteEntity>) =>{
    const notes = await repository.find({
        where: {
            id: Buffer.from(id, "base64url").toString("ascii"),
        },
        take: 1,
    });
    
    return notes.length > 0 ? notes[0] : null;
}