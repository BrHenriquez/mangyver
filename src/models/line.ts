import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne
  } from "typeorm";
import { Area } from "./area";
  
  @Entity("Line")
  export class Line {
    @PrimaryGeneratedColumn("uuid",{name: "LineID" })
    id!: string;
  
    @ManyToOne(() => Area, area => area.id)
    area!: Area;
  
    @Column({ name: "Name" })
    name!: string;
  
    @Column({ name: "SAPCode" })
    SAPCode!: string;
  
    @Column({ name: "Status", default: true })
    isActive!: boolean;

    @Column({ nullable: true, name: "Created" })
    @CreateDateColumn()
    created!: Date;
  }

