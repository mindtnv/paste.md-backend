import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Repository } from "typeorm";
import { NoteEntity } from "../NoteEntity";

export interface NoteHandlerPostArgs {
  content: string;
  title: string;
}

export const createNotePostHandler = (
  app: FastifyInstance,
  repository: Repository<NoteEntity>
) => {
  return async (
    request: FastifyRequest<{ Body: string }>,
    reply: FastifyReply
  ) => {
    try {
      const note = new NoteEntity();
      if (!request.body) return reply.code(400).send();

      const body = JSON.parse(request.body) as NoteHandlerPostArgs;
      if (!body.title || !body.content) return reply.code(400).send();

      note.content = body.content;
      note.title = body.title;
      note.createDate = new Date();
      note.updatedDate = new Date();
      note.editCode = Buffer.from(new Date().getTime().toString())
        .toString("base64")
        .substring(0, 18);
      await repository.save(note);

      reply.send({
        id: Buffer.from(note.id).toString("base64url"),
        title: note.title,
        content: note.content,
        editCode: note.editCode,
        createDate: note.createDate,
        updatedDate: note.updatedDate,
      });
    } catch (e) {
      console.error(e);
      return reply.code(500).send();
    }
  };
};
