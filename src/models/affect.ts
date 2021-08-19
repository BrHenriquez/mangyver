import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne
  } from "typeorm";
  
  @Entity("Affect")
  export class Affect {
    @PrimaryGeneratedColumn("uuid",{name: "AffectID" })
    id!: string;

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

