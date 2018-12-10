import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as jwt from 'express-jwt'
import { GraphQLSchema } from 'graphql'
import { createServer } from 'http'
import { Container } from 'inversify'
import 'reflect-metadata'
import * as winston from 'winston'
import { createContainer } from './core/container'
import { connectToDatabase } from './core/database'
import { createGraphiQlRoute } from './routes/graphiql'
import { createGraphQlRoute } from './routes/graphql'
import { createLoginRoute } from './routes/login'
import { calculateToken } from './shared/helpers/express'
import { createContext, createSchema } from './shared/helpers/graphql'
import { createSubscriptionServer } from './shared/helpers/subscriptions'

const DEFAULT_SECRET = 'totally-unguessable-jwt-secret'

class Server {
  public static async create() {
    const server = new Server()
    server.schema = await createSchema()
    await connectToDatabase()
    server.container = createContainer({ secret: DEFAULT_SECRET })
    server.createRoutes({ schema: server.schema })
    return server
  }

  private container: Container

  private schema: GraphQLSchema

  private port = 3001

  private paths = {
    root: `localhost:${this.port}`,
    login: '/login',
    graphql: '/graphql',
    graphiql: '/graphiql',
    subscriptions: '/subscriptions',
  }

  private expressApp: express.Application

  private constructor() {
    this.expressApp = express()
  }

  public setPort(port: number) {
    this.port = port
    return this
  }

  public listen(port?: number) {
    const server = createServer(this.expressApp)
    return new Promise((res, rej) => {
      server.listen( 3001, (err) => {
        if (err) {
          return rej(err)
        }
        createSubscriptionServer({
          path: this.paths.subscriptions,
          server,
          schema: this.schema,
          container: this.container,
        })
        const path = `http://${this.paths.root}`
        winston.log('info', `Server initiated in ${path}`)
        winston.log('info', `GraphqlServer initiated in ${path}${this.paths.graphql}`)
        winston.log('info', `Graphiql initiated in ${path}${this.paths.graphiql}`)
        winston.log(
          'info',
          `Subscriptions initiated in ws://${this.paths.root}${this.paths.subscriptions}`,
        )
        res()
      })
    })
  }

  private createRoutes({ schema }) {

    this.expressApp.use(
      cors(),
      bodyParser.json(),
      jwt({
        secret: this.container.get('JwtSecret'),
        credentialsRequired: false,
        getToken: calculateToken,
      }),
    )

    this.expressApp.use(
      this.paths.graphql,
      createGraphQlRoute({
        schema,
        createContext: (req) => createContext(req, this.container),
      }),
    )
    this.expressApp.use(
      this.paths.graphiql,
      createGraphiQlRoute({
        graphQlPath: this.paths.graphql,
        subscriptionsPath: this.paths.subscriptions,
      }),
    )
    this.expressApp.use(this.paths.login, createLoginRoute({ container: this.container }))
  }
}

export const launchServer = async () => {
  const server = await Server.create()
  return server.listen()
}

if (module.parent) {
  module.exports = { Server }
} else {
  launchServer()
}
