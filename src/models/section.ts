/* eslint-disable */
import { User } from "./user";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field } from "./field";
import { Form } from "./notice-form";

@Entity("Section")
export class Section {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "Name" })
  name!: string;

  @OneToMany(type => Field, field => field.section, { cascade: ["insert"] })
  fields!: Field[];

  @ManyToOne(type => User, user => user.id)
  userUpdate!: User;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn({ nullable: true, name: "UpdatedDate" })
  updatedDate!: Date;

  @ManyToOne(type => Form, form => form.id)
  form!: Form;
}
/* eslint-disable */
