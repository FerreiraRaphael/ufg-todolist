import { Container } from 'inversify'
import { AuthModule } from './auth/module'
import { HelloModule } from './hello/module'
import { TaskModule } from './task/module'
import User from './user/entity'
import { UserModule } from './user/module'

export interface ICurrentUser {
  get: () => Promise<User>
}

export function bindCurrentUser(container: Container, currentUser: () => Promise<User>) {
  const containerChild = container.createChild()
  containerChild.isBound('CurrentUser')
    ? containerChild.rebind<ICurrentUser>('CurrentUser').toConstantValue({ get: currentUser })
    : containerChild.bind<ICurrentUser>('CurrentUser').toConstantValue({ get: currentUser })
  return containerChild
}

interface ICreateContainerInput {
  secret: string
}

export function createContainer({secret}: ICreateContainerInput) {
  const container = new Container({ defaultScope: 'Singleton' })

  container.load(HelloModule, UserModule, AuthModule, TaskModule)

  container.bind<string>('JwtSecret').toConstantValue(secret)

  return container
}
