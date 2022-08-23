import { Affect } from "./../models/affect";
/* eslint-disable */
import internal from "stream";
import { Responsable } from './../models/responsable'
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
  startHour: string;
  endHour: string;
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
  textCause: string;
  textSymptom: string;
  equipmentSet: string;
  responsable: string;
  failureTimeStartDate: string;
  failureTime: string;
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
  machineId?: string,
  timezone?: string
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
      ",@machineId='" +
      machineId +
      "'"
  );
  //return repository.find({ relations: ['line', 'consecutive', 'cardType', 'priority', 'components', 'breakdown', 'failureType', 'affects', 'process']});
  return repository;
  //  return [];
};

export const getNoticesByMachineId = async (machineId?: any): Promise<Array<Notice>> => {
  const noticeRepository = getRepository(Notice);
  return noticeRepository.find({ equipmentId: machineId });
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
) => {
  let data: any = {};
  let card = null;
  let repercussion = null;
  let plannerGroup = null;
  let technicalLocation = null;
  let equipment = null;
  let component = null;
  let responsable = null;

  const processRepository = getRepository(Process)
  const process = await processRepository.findOne({ where: { SAPCode: payload.noticeType, operation: payload.operation, isActive: true } }) 
  
  if (!process) throw { data: payload, error: new Error(`noticeType: '${payload.noticeType}' not found`) }

  if (payload.codification) {
    const cardRepository = getRepository(Card)
    card = await cardRepository.findOne({ where: { SAPCode: payload.codification, operation: payload.operation, process: process.processId, isActive: true } }) 
    
    if (!card) throw { data: payload, error: new Error(`codification: '${payload.codification}' not found`) }
  }

  const priorityRepository = getRepository(Priority)
  const priority = await priorityRepository.findOne({ where: { SAPCode: payload.priority, operation: payload.operation, isActive: true } })
  
  if (!priority) throw { data: payload, error: new Error(`priority: '${payload.priority}' not found`) }

  if (payload.repercussion) {
    const affectRepository = getRepository(Affect)
    repercussion = await affectRepository.findOne({ where: { SAPCode: payload.repercussion, operation: payload.operation, isActive: true } })
  
    if (!repercussion) throw { data: payload, error: new Error(`repercussion: '${payload.repercussion}' not found`) }
  }

  if (payload.plannerGroup) {
    const typeFailRepository = getRepository(TypeFail)
    plannerGroup = await typeFailRepository.findOne({ where: { SAPCode: payload.plannerGroup, operation: payload.operation, isActive: true } })
  
    if (!plannerGroup) throw { data: payload, error: new Error(`plannerGroup: '${payload.plannerGroup}' not found`) }
  }

  if (payload.equipment) {
    const lineMachineRepository = getRepository(LineMachine)
    equipment = await lineMachineRepository.findOne({ relations: ['line'], where: { SAPCode: payload.equipment, isActive: true, line: { operation: payload.operation } } })
  
    if (!equipment) throw { data: payload, error: new Error(`equipment: '${payload.equipment}' not found`) }
    
    if (payload.equipmentSet) {
      const componentRepository = getRepository(Component)
      component = await componentRepository.findOne({ relations: ['lineMachine'], where: { SAPCode: payload.equipmentSet, isActive: true, machine: { id: equipment?.id } } })
    
      if (!component) throw { data: payload, error: new Error(`equipmentSet: '${payload.equipmentSet}' not found`) }
    }
  }

  if (payload.technicalLocation) {
    const lineRepository = getRepository(Line)
    technicalLocation = await lineRepository.findOne({ where: { SAPCode: payload.technicalLocation, operation: payload.operation, isActive: true } })
  
    if (!technicalLocation) throw { data: payload, error: new Error(`technicalLocation: '${payload.technicalLocation}' not found`) }
  }

  if (payload.responsable) {
    const responsableRepository = getRepository(Responsable)
    responsable = await responsableRepository.findOne({ where: { SAPCode: payload.responsable, operationId: payload.operation, isActive: true } })
  
    if (!responsable) throw { data: payload, error: new Error(`responsable: '${payload.responsable}' not found`) }
  }
  
  data = { 
    ...payload,
    cardTitle: payload.title, 
    cardDescription: payload.description, 
    lineId: technicalLocation?.id,
    equipmentId: equipment?.id,
    componentsId: component?.id,
    failureTypeId: plannerGroup?.id,
    affectsId: repercussion?.id,
    priorityId: priority.id,
    cardTypeId: card?.id,
    processId: process.id,
    responsableId: responsable?.id,
  };

  const repository = getRepository(Notice);
  const notice = new Notice();

  const noticeCreated = await repository.save({
    ...notice,
    ...data,
  });

  return {
    status: "OK",
    reqData: payload,
    resData: noticeCreated,
    msg: "data recived and saved",
  };
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

export const destroyNoticeById = async (id: string) =>  {
    const {affected} = await getRepository(Notice).delete({ id })
    if(!affected) throw new Error(`Could not find id: ${id}`);
  };
