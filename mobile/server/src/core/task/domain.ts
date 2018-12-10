import { inject, injectable } from 'inversify'
import { pubsub } from '../../../src/shared/helpers/subscriptions'
import { Task } from './entity'
import { TaskService } from './service'

export const channels = {
  ADDED: 'TASK_ADDED',
  EDITED: 'TASK_EDITED',
  DELETED: 'TASK_DELETED',
}

@injectable()
export class TaskDomain {

  @inject(TaskService)
  private taskService: TaskService

  public tasks() {
    return this.taskService.find()
  }

  public createTask(input: Partial<Task>) {
    return this.taskService.create(input).then((task) => {
      console.log('ta passando aqui de buenas', task)
      pubsub.publish(channels.ADDED, { taskAdded: task })
      return task
    })
  }

  public editTask(id: number, input: Partial<Task>) {
    return this.taskService.edit(id, input).then((user) => {
      pubsub.publish(channels.EDITED, { taskEdited: user })
      return user
    })
  }

  public deleteTask(id: number) {
    return this.taskService.delete(id).then(() => {
      pubsub.publish(channels.DELETED, { taskDeleted: id })
      return id
    })
  }
}
