/* eslint-disable */
import { Form } from "../models";
import { Get, Route, Tags, Post, Body, Path, Query } from "tsoa";
import { getForm, createForm, IFormPayload } from "../repositories/notice-form";

@Route("fnmobile")
@Tags("Process")
export default class FormController {
  @Get("/")
  public async getForm(@Query() profile?: string) {
    return getForm(profile);
  }

  @Post("/")
  public async createForm(@Body() body: IFormPayload): Promise<Form> {
    return createForm(body);
  }
}
