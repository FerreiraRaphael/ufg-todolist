import { ContainerModule } from 'inversify'
import { getCustomRepository } from 'typeorm'
import { TaskDomain } from './domain'
import { TaskRepository } from './repository'
import { TaskService } from './service'

export const TaskModule = new ContainerModule((bind) => {
  bind<TaskService>(TaskService).toSelf()
  bind<TaskRepository>(TaskRepository)
    .toConstantValue(getCustomRepository(TaskRepository))
  bind<TaskDomain>(TaskDomain).toSelf()
})
