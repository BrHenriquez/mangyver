import { Affect } from './../models/affect'
/* eslint-disable */
import internal from "stream";
import { getRepository } from "typeorm";
import {
  Breakdown,
  Card,
  Component,
  Consecutive,
  Line,
  Notice,
  Priority,
  TypeFail,
  Process,
  Equipment,
  User,
  Operation,
  ObjectParts,
  Cause,
  Symptom,
  LineMachine,
} from "../models";

export interface INoticePayload {
  otCode: string;
  didCard: string;
  failureTime: string;
  department: string;
  // equipmentCode: string;
  line: Line;
  // equipmentType: string;
  // consecutive: Consecutive;
  cardType: Card;
  cardTitle: string;
  priority: Priority;
  components: Component;
  breakdown: Breakdown;
  failureType: TypeFail;
  affects: Affect;
  affectsFile: string;
  isActive?: boolean;
  cardDescription: string;
  process: Process;
  user: User;
  sapId: string;
  operation: Operation;
  objectId: ObjectParts;
  causeId: Cause;
  symptomId: Symptom;
  textCause: string;
  textSymptom: string;
  failureTimeStartDate: string;
  failureTimeStartTime: string;
}

export interface INoticenPayloadNewFormat {
  processId: Process;
  didCard: string;
  failureTime: string;
  department: string;
  lineId: Line;
  equipment: Equipment;
  cardTypeId: Card;
  cardTitle: string;
  priorityId: Priority;
  componentsId: Component;
  breakdownId: Breakdown;
  failureTypeId: TypeFail;
  cardDescription: string;
  affectsId: Affect;
  otCode: string;
  id: string;
  affectsFile: string;
  userId: null;
  isActive: true;
  sapId: string;
  operation: Operation;
  objectId?: ObjectParts;
  causeId?: Cause;
  symptomId?: Symptom;
  textCause: string;
  textSymptom: string;
}

export interface INoticeThirdParties {
  noticeType: string;
  codification: string;
  priority: string;
  repercussion: string;
  plannerGroup: string;
  equipment: string;
  technicalLocation: string;
  title: string;
  description: string;
  objectPartText: string;
  symptomText: string;
  equipmentSet: string;
  operation: string;
}

export const getNotices = async (
  userId: string,
  top?: number,
  from?: number,
  dateFrom?: string | null,
  dateEnd?: string | null,
  sapForm?: boolean,
  isWeb?: boolean,
  timeFrom?: string | null,
  timeEnd?: string | null,
  operationId?: string | null,
  filter?: string | null,
  totalRows?: boolean,
  isActive?: boolean,
  timezone?: string,
): Promise<Array<Notice>> => {
  console.log(
    userId,
    top,
    from,
    dateFrom,
    dateEnd,
    sapForm,
    isWeb,
    timeFrom,
    timeEnd,
    operationId,
    filter,
    totalRows
  );

  // const pp = new Date(Date.parse("19000101")).toDateString()

  const repository = await getRepository(Notice).query(
    "SP_Select_Notices @userid='" +
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
      " ,@SAPForm=" +
      sapForm +
      ",@isWeb=" +
      isWeb +
      ",@timeFrom=" +
      timeFrom +
      ",@timeEnd=" +
      timeEnd +
      ",@operationId='" +
      operationId +
      "',@filter='" +
      filter +
      "',@isActive=" +
      isActive +
      ",@totalRows=" +
      totalRows +
      ""
  );
  //return repository.find({ relations: ['line', 'consecutive', 'cardType', 'priority', 'components', 'breakdown', 'failureType', 'affects', 'process']});
  return repository;
  //  return [];
};

export const createNotice = async (
  payload: INoticePayload
): Promise<Notice> => {
  const repository = getRepository(Notice);
  const notice = new Notice();
  return repository.save({
    ...notice,
    ...payload,
  });
};

export const createNoticeThirdParties = async (
  payload: INoticeThirdParties
)/* : Promise<Notice> */ => {
  let data: any = {}

  const processRepository = getRepository(Process)
  const process = await processRepository.findOne({ where: { name: payload.noticeType, operation: payload.operation } }) 

  if (!process) throw new Error(JSON.stringify({data:payload, msg:"noticeType not found"}));
  
  const cardRepository = getRepository(Card)
  const card = await cardRepository.findOne({ where: { name: payload.codification, operation: payload.operation } }) 
  
  if (!card) throw new Error(JSON.stringify({data:payload, msg:"codification not found"}));

  const priorityRepository = getRepository(Priority)
  const priority = await priorityRepository.findOne({ where: { name: payload.priority, operation: payload.operation } })
  
  if (!priority) throw new Error(JSON.stringify({data:payload, msg:"priority not found"}));

  const affectRepository = getRepository(Affect)
  const repercussion = await affectRepository.findOne({ where: { name: payload.repercussion, /* operation: payload.operation */ } })

  if (!repercussion) throw new Error(JSON.stringify({data:payload, msg:"repercussion not foundr"}));

  const typeFailRepository = getRepository(TypeFail)
  const plannerGroup = await typeFailRepository.findOne({ where: { name: payload.plannerGroup, operation: payload.operation } })

  if (!plannerGroup) throw new Error(JSON.stringify({data:payload, msg:"plannerGroup not found"}));

  const lineMachineRepository = getRepository(LineMachine)
  const equipment = await lineMachineRepository.findOne({ where: { name: payload.equipment } })

  if (!equipment) throw new Error(JSON.stringify({data:payload, msg:"equipment not found"}));

  const lineRepository = getRepository(Line)
  const technicalLocation = await lineRepository.findOne({ where: { name: payload.technicalLocation } })

  if (!technicalLocation) throw new Error(JSON.stringify({data:payload, msg:"technicalLocation not found"}));
  
  data = { 
    ...payload, 
    lineId: technicalLocation.id,
    equipmentId: equipment.id,
    failureTypeId: plannerGroup.id,
    affectsId: repercussion.id,
    priorityId: priority.id,
    cardTypeId: card.id,
    processId: process.id
  }

  const repository = getRepository(Notice);
  const notice = new Notice();

  const noticeCreated = await repository.save({
    ...notice,
    ...data,
  });

  return { status: 'OK', reqData: payload, resData:noticeCreated, msg:'data recived and saved' }
};

export const createnewNoticeFormat = async (
  payload: INoticenPayloadNewFormat
): Promise<Notice> => {
  const repository = getRepository(Notice);
  const notice = new Notice();
  return repository.save({
    ...notice,
    ...payload,
  });
};

export const updateNotice = async (
  id: string,
  payload: INoticenPayloadNewFormat
): Promise<String> => {
  const repository = getRepository(Notice);
  const record = repository.findOne({ where: { id } });
  if (!record) return "Notice not found";
  await repository.update(id, payload);
  return id;
};

export const getNotice = async (id: string): Promise<Notice | null> => {
  const repository = await getRepository(Notice).query(
    "SP_Select_Notices @userid='" + null + "', @id='" + id + "'"
  );
  //"SP_Select_Notices @id='"+id +"'"
  //const notification = await repository.findOne({ id: id }, { relations: ['line', 'consecutive', 'cardType', 'priority', 'components', 'breakdown', 'failureType', 'affects', 'process'] });
  // if (!notification) return null;
  // const entries = Object.entries(notification);
  //  entries.map(entry =>

  //   console.log(Object.assign(entry, { 9: +entry[0] })));

  // return notification;
  console.log(repository);
  return repository;
};
/* eslint-disable */
