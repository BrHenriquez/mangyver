/* eslint-disable */
import { error } from "console";
import { getRepository } from "typeorm";
import { Notification, OperationNumber, Deviation, Operation } from "../models";

export interface INotificationPayload {
  deviationId: Deviation;
  operationNumId: OperationNumber;
  operation: Operation;
  otCode: string;
  startHour: string;
  endHour: string;
  isDone: boolean;
  comments?: string;
  numPeople?: number;
  partialDate?: Date;
  endDate?: Date;
}

export const getNotifications = async (
  userId: string,
  top?: number,
  from?: number,
  dateFrom?: string | null,
  dateEnd?: string | null,
  sapForm?: boolean,
  isWeb?: boolean,
  filter?: string | null,
  totalRows?: boolean,
  timezone?: string,
): Promise<Array<Notification>> => {
  console.log(from, top, dateFrom, dateEnd, sapForm, filter)
  const repository = getRepository(Notification).query(
    "SP_Select_Notification @userid='" +
      userId +
      "', @id=" +
      null +
      ", @top=" +
      top +
      ", @from=" +
      from +
      ", @DateFrom=" +
      dateFrom +
      ", @DateEnd=" +
      dateEnd +
      ",@SAPForm=" +
      sapForm +
      ",@isWeb=" +
      isWeb +
      ",@filter=" +
      filter +
      ",@totalRows=" +
      totalRows +
      ""
  );
  return repository;
};

export const createNotification = async (
  payload: INotificationPayload
): Promise<Notification> => {
  const repository = getRepository(Notification);
  const notification = new Notification();

  console.log(payload.startHour.toString());
  return repository.save({
    ...notification,
    ...payload,
  });
};

export const getNotification = async (
  id: string
): Promise<Notification | null> => {
  // const repository = getRepository(Notification);
  // const notification = await repository.findOne({ id: id });
  // if (!notification) return null;
  // return notification;
  const repository = await getRepository(Notification).query(
    "SP_Select_Notification @userid='" + null + "', @id='" + id + "'"
  );
  return repository;
};

export const destroyNoficicationById = async (id: string) =>  {
    const { affected } = await getRepository(Notification).delete(id)
    if(!affected) throw new Error(`Could not find notification with id: ${id}`)    
};

/* eslint-disable */
