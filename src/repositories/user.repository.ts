/* eslint-disable */
import { Line, Operation, Role } from "../models";
import { getRepository } from "typeorm";
import { User } from "../models";
import { Area } from "../models";
export interface IUserPayload {
  name: string;
  username: string;
  password: string;
  email: string;
  role: Role;
  isActive: boolean;
  SAPCode: string;
  SAPUser: string;
  operation: Operation;
  area: Area;
  line: Line;
}

export const getUsers = async (
  operationId?: string,
  skip?: number,
  take?: number
): Promise<{ data: User[]; count: number }> => {
  const userRepository = getRepository(User);
  const options = {
    relations: ["operation", "area", "line", "role"],
    where: { operation: operationId, isActive: true },
    skip: skip,
    take: take,
  };
  const [data, count] = await Promise.all([
    userRepository.find(options),
    userRepository.count({ where: options.where }),
  ]);
  return { data, count };
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const getUser = async (id: string): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(
    { id: id },
    { relations: ["operation", "area", "line", "role"] }
  );
  if (!user) return null;
  return user;
};

export const updateUserStatus = async (
  id: string,
  status: string
): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(
    { id: id },
    { relations: ["operation", "area", "line", "role"] }
  );
  if (!user) return null;
  if (status == "true") {
    user.auth = "active";
  } else {
    user.auth = "pending";
  }
  await userRepository.save(user);
  return user;
};
/* eslint-disable */
