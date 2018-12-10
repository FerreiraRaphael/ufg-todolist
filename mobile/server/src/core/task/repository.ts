import { injectable } from 'inversify'
import { EntityRepository, Repository } from 'typeorm'
import {Task} from './entity'

@injectable()
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
