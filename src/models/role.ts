/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity("Role")
export class Role {
  @PrimaryGeneratedColumn("uuid", { name: "RoleID" })
  id!: string;

  @Column({ nullable: false, name: "Name" })
  name!: string;

  /* @Column({ name: "Description" })
    description!: string; */

  @Column({ default: false, name: "Status" })
  isActive!: boolean;

  @CreateDateColumn()
  created!: Date;
}
/* eslint-disable */
