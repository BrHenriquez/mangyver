import { destroyNoticeById, getNoticesByMachineId } from './../repositories/notice.repository'
/* eslint-disable */
import { profile } from "console";
import { Get, Route, Tags, Post, Body, Path, Query, Put } from "tsoa";
import { Notice } from "../models";
import {
  getNotice,
  getNotices,
  createNotice,
  updateNotice,
  INoticePayload,
  INoticenPayloadNewFormat,
  createnewNoticeFormat,
  INoticeThirdParties,
  createNoticeThirdParties
} from "../repositories/notice.repository";
import { Request, Response } from 'express';

@Route("notices")
@Tags("Notice")
export default class NoticeController {
  @Get("/")
  public async getNotices(
    @Query() profileId: string,
    @Query() top: number,
    @Query() from: number,
    @Query() dateFrom: string | null,
    @Query() dateEnd: string | null,
    @Query() sapForm: boolean,
    @Query() isWeb: boolean,
    @Query() timeFrom: string | null,
    @Query() timeEnd: string | null,
    @Query() operationId: string,
    @Query() filter: string,
    @Query() totalRows: boolean,
    @Query() isActive: boolean,
    @Query() timezone: string,
  ): Promise<Array<Notice>> {

    if (dateFrom === 'null') {
      dateFrom = null
      dateEnd = null
    }else {
      dateFrom = `'${dateFrom}'`
      dateEnd = `'${dateEnd}'`
    }
  
    if (timeFrom === 'null') {
      timeFrom = null
      timeEnd = null
    }else {
      timeFrom = `'${timeFrom}'`
      timeEnd = `'${timeEnd}'`
    }

    const tt = getNotices(
      profileId,
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
      totalRows,
      isActive,
      timezone
    );
    return tt;
  }

  @Post("/old_notice")
  public async createNotice(@Body() body: INoticePayload): Promise<Notice> {
    return createNotice(body);
  }

  @Post("/")
  public async createNoticeNewFormat(
    @Body() body: INoticenPayloadNewFormat
  ): Promise<Notice> {
    return createnewNoticeFormat(body);
  }

  @Post("/external-notice-consumers")
  public async createNoticeThirdParties(
    @Body() body: INoticeThirdParties
  ) {
    return createNoticeThirdParties(body);
  }

  @Get("/notice-machine")
  public async getNoticesByMachineId(
    @Query() machineId: any
  ): Promise<Array<Notice>> {
    return getNoticesByMachineId(machineId);
  }
  
  @Put("/:id")
  public async updateNotice(
    @Path() id: string,
    @Body() body: INoticenPayloadNewFormat
  ): Promise<String> {
    return updateNotice(id, body);
  }

  @Get("/:id")
  public async getNotice(@Path() id: string): Promise<Notice | null> {
    return getNotice(id);
  }
}

export const deleteNoticeById = async (request: Request, response: Response) => {
  try {
    const {id} = request.params;
    console.log(`[Mangyver] Deleting notice id: ${id}`)
    await destroyNoticeById(id);
    response.status(202).send({data: `Notice with id:${id} has been deleted`})
  } catch (error: any) {
    const errorMessage = `Could not delete notice with id:${request.params.id}` 
    console.error(`${errorMessage} - error: ${error.message} - stack ${error.stack}`)
    response.status(500).send({data:errorMessage })
    throw new Error(error.message)
  }
}
/* eslint-disable */
