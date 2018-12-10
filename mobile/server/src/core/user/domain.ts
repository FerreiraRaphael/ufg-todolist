import { inject, injectable } from 'inversify'
import { ICurrentUser } from '../container'
import { UserService } from './service'

@injectable()
export class UserDomain {
  private userService: UserService
  private currentUser: ICurrentUser

  constructor(userService: UserService, @inject('CurrentUser') currentUser: ICurrentUser) {
    this.userService = userService
    this.currentUser = currentUser
  }

  public me() {
    return this.currentUser.get()
  }

  public users() {
    return this.userService.getUsers()
  }
}
