import { Container } from 'inversify'
import { channels, TaskDomain } from 'src/core/task/domain'
import { Task } from 'src/core/task/entity'
import { pubsub } from '../../../src/shared/helpers/subscriptions'
import { IGraphqlContext } from '../context'

const taskDomain = (container: Container) => container.get(TaskDomain)

export const resolver = {
  Query: {
    tasks: (_, args, { container }: IGraphqlContext) => taskDomain(container).tasks(),
  },
  Mutation: {
    createTask: (_, { task }: { task: Partial<Task> }, { container }: IGraphqlContext) =>{
      console.log('tamo aqui', task)
      return taskDomain(container).createTask(task)
    },
    editTask: (
      _,
      { id, task }: { id: number; task: Partial<Task> },
      { container }: IGraphqlContext,
    ) => taskDomain(container).editTask(id, task),
    deleteTask: (
      _,
      { id }: { id: number; },
      { container }: IGraphqlContext,
    ) => taskDomain(container).deleteTask(id),
  },
  Subscription: {
    taskAdded: {
      subscribe: () => pubsub.asyncIterator([channels.ADDED]),
    },
    taskEdited: {
      subscribe: () => pubsub.asyncIterator([channels.EDITED]),
    },
    taskDeleted: {
      subscribe: () => pubsub.asyncIterator([channels.DELETED]),
    },
  },
}
