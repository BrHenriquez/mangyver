import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from "typeorm";
  
  @Entity("Card")
  export class Card {
    @Column({ name: "CardId" })
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ name: "Name" })
    name!: string;
  
    @Column({ name: "Status", default: true })
    isActive!: boolean;

    @Column({ nullable: true, name: "Created" })
    @CreateDateColumn()
    created!: Date;
  }
