import { ContainerModule } from 'inversify'
import { AuthDomain } from './domain'
import { AuthService } from './service'

export const AuthModule = new ContainerModule((bind) => {
  bind<AuthDomain>(AuthDomain).toSelf()
  bind<AuthService>(AuthService).toSelf()
})
