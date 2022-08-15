/* eslint-disable */
/*

field: {
			fieldType: 'select',
			label : 'Oficinas',
			optionsEndpoint: 'https://endpoing.com',
			validations: ['required'],
			childfield : {
        id: '',
				toMatch: 'asasd',
				fieldType: 'select',
				label : 'Número de telefono',
				optionsEndpoint: 'https://endpoing.com',
				validations: ['required'],
			}

      */
     
import { User } from './user';
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

// export enum FieldType {
//   select = "select",
//   input = "Input",
//   radiobutton = "RadioButton",
//   textarea = "TextArea",
// }

export interface Ichildfield {
  id: number;
  toMatch: string;
  fieldType: string;
  label: string;
  optionsEndpoint: string;
  validations: string[];
}

@Entity("Field")
export class Field {
  @Column({ name: "ID" })
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "FieldType" })
  fieldType!: string;

  @Column({ name: "Label" })
  label!: string;

  @Column({ name: "OptionsEndpoint" })
  optionsEndpoint!: string;

  @Column({ name: "Validations" })
  validations!: string;

  @ManyToOne((type) => Field, (field) => field.childfield)
  parent!: Field;

  @OneToMany((type) => Field, (field) => field.parent, { cascade: ['insert'] })
  childfield!: Field[];

  @ManyToOne(type => Section, section => section.id)
  section!: Section;

  @ManyToOne(type => User, user => user.id)
  userUpdate!: User;

  @UpdateDateColumn({ nullable: true, name: "UpdatedDate" })
  updatedDate!: Date;
}
/* eslint-disable */
