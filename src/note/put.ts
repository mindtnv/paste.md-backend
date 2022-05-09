import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Repository } from "typeorm";
import { NoteEntity } from "../NoteEntity";
import { NoteHandlerPostArgs } from "./post";
import { NoteHandlerGetArgs } from "./get";
import {getNoteById} from "../utils";

export const createNotePutHandler = (
  app: FastifyInstance,
  repository: Repository<NoteEntity>
) => {
  return async (
    request: FastifyRequest<{
      Body: string;
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

      if (!request.body) return reply.code(400).send();

      const body = JSON.parse(request.body) as NoteHandlerPostArgs;
      if (!body.title && !body.content) return reply.code(200).send();
      if (body.title) note.title = body.title;
      if (body.content) note.content = body.content;

      note.updatedDate = new Date();
      await repository.save(note);
      reply.send({
        id: Buffer.from(note.id).toString("base64url"),
        title: note.title,
        content: note.content,
        createDate: note.createDate,
        updatedDate: note.updatedDate,
      });
    } catch (e) {
      return reply.code(500).send();
    }
  };
};
