import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

export type OrderStatus = {
    A: "assigned",
    P : "in progres",
    N : "notification done",
    D : "delayed",
    R : "Re-assigned",
}

@Entity("assigned_order")
export class AssignedOrder {
  @Column({name: 'id'})
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column({ name: "orderNumber" })
  orderNumber!: string;

  @Column({ name: "userId" })
  userId!: string;

  @Column("simple-array")
  numPersons!: string[];
  
  @Column({name: "stimatedTime", default: 15 })
  stimatedTime!: number;

  @Column({ name: "extendedText" })
  extendedText!: string;

  @Column({ name: "noticeSAPcode" })
  noticeSAPcode!: string;

  @Column({ name: "assignedDate" })
  assignedDate!: Date;

  @Column({ name: "scheduledDate" })
  scheduledDate!: Date;

  @Column({ name: "operations" })
  operations!: string;

  @Column({name: "orderStatus"})
  orderStatus!: string;

  @Column({name: "status" })
  status!: boolean;
}
