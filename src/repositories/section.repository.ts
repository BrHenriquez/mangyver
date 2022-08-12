/* eslint-disable */
import { getRepository } from "typeorm";
import { Field, Section } from "../models";

export interface ISectionPayload {
  name: string;
  fields: Field[];
}

export const getSections = async (): Promise<Array<Section>> => {
  const repository = getRepository(Section);
  return repository.find();
};

export const createSection = async (
  payload: ISectionPayload[]
): Promise<Section[]> => {
  const repository = getRepository(Section);
  const sections = repository.create(payload);
  await repository.save(sections);

  return sections
};

export const getSection = async (id: string): Promise<Section | null> => {
  const repository = getRepository(Section);
  const section = await repository.findOne({ id: id });
  if (!section) return null;
  return section;
};
/* eslint-disable */
