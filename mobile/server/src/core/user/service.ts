import { injectable } from 'inversify'
import { FindConditions } from 'typeorm'
import User from './entity'
import { UserRepository } from './repository'

@injectable()
export class UserService {

  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public findUserBy(where: FindConditions<User>) {
    return this.userRepository.findOne({ where })
  }

  public getUsers() {
    return this.userRepository.find()
  }
}
