import { DataSource } from "typeorm";
import { NoteEntity } from "./NoteEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.APP_DB_LOCATION,
  synchronize: true,
  logging: false,
  entities: [NoteEntity],
});
