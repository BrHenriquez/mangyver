import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import {User} from '../models'
import {getUsers, createUser, IUserPayload, getUser} from '../repositories/user.repository'

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return getUsers()
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    let user = new User();
    user.name = body.name;
    user.username = body.username;
    user.password = body.password;
    user.email = body.email;
    user.role = body.role;
    user.isActive = body.isActive;
    user.hashPassword();
    return createUser(user)
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return getUser(id)
  }
}
