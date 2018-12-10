import { ContainerModule } from 'inversify'
import { getCustomRepository } from 'typeorm'
import { UserDomain } from './domain'
import { UserRepository } from './repository'
import { UserService } from './service'

export const UserModule = new ContainerModule((bind) => {
  bind<UserRepository>(UserRepository)
    .toConstantValue(getCustomRepository(UserRepository))
  bind<UserService>(UserService).toSelf()
  bind<UserDomain>(UserDomain).toSelf()
})
