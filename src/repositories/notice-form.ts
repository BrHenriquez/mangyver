/* eslint-disable */
import { getConnection, getRepository } from "typeorm";
import { Section, Form } from "../models";

export interface IFormPayload {
  name: string;
  sections: Section[];
}

export const getForm = async (userId?: string) => {
  const connection = getConnection();
  const result = await connection.query(
    "SP_NoticeFormMobil @userid='" + userId + "'"
  );

  console.log(result);
  return result;
};

export const createForm = async (payload: IFormPayload): Promise<Form> => {
  const repository = getRepository(Form);
  const forms = repository.create(payload);
  await repository.save(forms);

  return forms;
};
