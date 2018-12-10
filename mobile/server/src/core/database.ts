import { ConnectionOptions, createConnection } from 'typeorm'
import { Task } from './task/entity'
import User from './user/entity'

const DATABASE_URL = process.env.DATABASE_URL

const connectionOptions: Partial<ConnectionOptions> = DATABASE_URL
  ? {
      url:
        DATABASE_URL,
    }
  : {
      host: 'postgres.local',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
    }

export const connectToDatabase = () =>
  createConnection({
    type: 'postgres',
    ...(connectionOptions as ConnectionOptions),
    entities: [User, Task],
    synchronize: true,
  })

if (!module.parent) {
  connectToDatabase()
}
