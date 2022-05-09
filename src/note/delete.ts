import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {Repository} from "typeorm";
import {NoteEntity} from "../NoteEntity";
import {NoteHandlerGetArgs} from "./get";
import {getNoteById} from "../utils";

export const createNoteDeleteHandler = (
    app: FastifyInstance,
    repository: Repository<NoteEntity>
) => {
    return async (
        request: FastifyRequest<{
            Querystring: { editCode: string };
            Params: NoteHandlerGetArgs;
        }>,
        reply: FastifyReply
    ) => {
        try {
            const note = await getNoteById(request.params.id, repository);
            if (note === null) return reply.code(404).send();
            if (note.editCode !== request.query.editCode)
                return reply.code(401).send();
            await repository.remove(note);
            return reply.status(200).send();
        } catch (e) {
            console.error(e);
            return reply.code(500).send();
        }
    };
};
