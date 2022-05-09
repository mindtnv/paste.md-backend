import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Repository } from "typeorm";
import { NoteEntity } from "../NoteEntity";
import {getNoteById} from "../utils";

export interface NoteHandlerGetArgs {
  id: string;
}

export const createNoteGetHandler = (
  app: FastifyInstance,
  repository: Repository<NoteEntity>
) => {
  return async (
    request: FastifyRequest<{ Params: NoteHandlerGetArgs }>,
    reply: FastifyReply
  ) => {
    try {
      const note = await getNoteById(request.params.id, repository);
      if (note === null) return reply.code(404).send();
      reply.send({
        id: request.params.id,
        title: note.title,
        content: note.content,
        createDate: note.createDate,
        updatedDate: note.updatedDate,
      });
    } catch (e) {
      console.error(e);
      return reply.code(500).send();
    }
  };
};
