import { inject, injectable } from 'inversify'
import { AuthService } from './service'

export interface LoginInput {
  email: string
  password: string
}

@injectable()
export class AuthDomain {

  @inject(AuthService)
  private authService: AuthService

  public login({email, password}: LoginInput) {
    return this.authService.login(email, password)
  }
}
