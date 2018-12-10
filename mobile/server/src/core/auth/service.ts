import { AuthenticationError } from 'apollo-server'
import { inject, injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'
import { UserService } from '../user/service'

@injectable()
export class AuthService {

  public static authError() {
    return new AuthenticationError('Invalid email or password')
  }

  @inject('JwtSecret')
  private secret: string
  @inject(UserService)
  private userService: UserService

  public async login(email: string, password: string) {
    const user = await this.userService.findUserBy({ email })
    if(!user) {
      throw AuthService.authError()
    }
    if(user.password !== password ) {
      throw AuthService.authError()
    }
    return this.createToken({
      id: user.id,
      version: user.version
    })
  }

  public async verify(token: string) {
    try {
      const user = await jwt.verify(token, this.secret)
      return Promise.resolve(user)
    } catch(e) {
      return Promise.resolve({})
    }
  }

  private createToken(user: {id: number, version: string}) {
    return jwt.sign({ ...user }, this.secret)
  }
}
