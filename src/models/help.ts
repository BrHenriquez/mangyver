/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { Operation } from "./operation";

@Entity("Help")
export class Help {
  @Column({ name: "HelpID" })
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "Url", length: 500 })
  url!: string;

  @Column({ name: "Status", default: true })
  isActive!: boolean;

  @Column({ nullable: true, name: "Created" })
  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn({ nullable: true, name: "UpdatedDate" })
  updatedDate!: Date;

  @ManyToOne(type => Operation, operation => operation.id, { nullable: true })
  operation!: Operation;
}
