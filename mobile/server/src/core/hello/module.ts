import { ContainerModule } from 'inversify'
import { HelloDomain } from './domain'
import { HelloService } from './service'

export const HelloModule = new ContainerModule((bind) => {
  bind<HelloService>(HelloService).toSelf()
  bind<HelloDomain>(HelloDomain).toSelf()
})
