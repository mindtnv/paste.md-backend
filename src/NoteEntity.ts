import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NoteEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  title: string;
  @Column("text")
  content: string;
  @Column()
  editCode: string;
  @Column()
  createDate: Date;
  @Column()
  updatedDate: Date;
}
