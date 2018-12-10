import { inject, injectable } from 'inversify'
import { Task } from './entity'
import { TaskRepository } from './repository'

@injectable()
export class TaskService {

  @inject(TaskRepository)
  private taskRepository: TaskRepository

  public find() {
    return this.taskRepository.find()
  }

  public create(user: Partial<Task>) {
    return this.taskRepository.save(
      this.taskRepository.merge(new Task(), user)
    )
  }

  public async edit(id: number, input: Partial<Task>) {
    const user = await this.taskRepository.findOne({id})
    user.text = input.text
    user.completed = input.completed
    return this.taskRepository.save(user)
  }

  public delete(id: number) {
    return this.taskRepository.delete({ id })
  }
}
