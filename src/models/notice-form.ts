/* eslint-disable */
import { Operation } from "./operation";
import { User } from "./user";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Section } from "./section";

@Entity("FormNoticeMobile")
export class Form {
  @PrimaryGeneratedColumn("uuid", { name: "AffectID" })
  id!: string;

  @Column({ name: "form", nullable: true })
  form!: string;

  @ManyToOne(type => User, user => user.id)
  userUpdate!: User;

  @Column({ name: "Status", default: true })
  isActive!: boolean;

  @Column({ nullable: true, name: "Created" })
  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn({ nullable: true, name: "UpdatedDate" })
  updatedDate!: Date;

  @OneToMany(type => Section, section => section.form, { cascade: ["insert"] })
  sections!: Section[];
}
