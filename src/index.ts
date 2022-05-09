import "reflect-metadata";
import { AppDataSource } from "./AppDataSource";
import fastify from "fastify";
import { NoteEntity } from "./NoteEntity";
import { createNoteGetHandler } from "./note/get";
import { createNotePutHandler } from "./note/put";
import { createNotePostHandler } from "./note/post";
import {createNoteDeleteHandler} from "./note/delete";

async function main() {
  await AppDataSource.initialize();
  const notesRepository = AppDataSource.getRepository<NoteEntity>(NoteEntity);
  const app = fastify();

  app.register(require("@fastify/cors"), {
    origin: "http://localhost:3000",
  });
  app.get("/note/:id", createNoteGetHandler(app, notesRepository));
  app.put("/note/:id", createNotePutHandler(app, notesRepository));
  app.delete("/note/:id", createNoteDeleteHandler(app, notesRepository));
  app.post("/note", createNotePostHandler(app, notesRepository));
  await app.listen(8000, "0.0.0.0");
  console.log("Server started ad 0.0.0.0:8000");
}

main();
