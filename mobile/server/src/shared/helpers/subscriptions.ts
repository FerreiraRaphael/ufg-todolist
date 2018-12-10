import { PubSub } from 'apollo-server'
import { execute, GraphQLSchema, subscribe } from 'graphql'
import { Server } from 'http'
import { Container } from 'inversify'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { addEncodeJwtInRequest } from './express'
import { createContext } from './graphql'

interface ICreateSubscriotionsServerInput {
  path: string
  server: Server
  schema: GraphQLSchema
  container: Container
}

export function createSubscriptionServer({
  path,
  server,
  schema,
  container,
}: ICreateSubscriotionsServerInput) {
  return new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: async (connectionParams, webSocket) =>
        addEncodeJwtInRequest(webSocket.upgradeReq, container).then((req) =>
          createContext(req, container),
        ),
    },
    {
      path,
      server,
    },
  )
}


export const pubsub = new PubSub()
