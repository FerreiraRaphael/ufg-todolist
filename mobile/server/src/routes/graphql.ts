import { graphqlExpress } from 'apollo-server-express'
import { Request, Router } from 'express'
import { GraphQLSchema } from 'graphql'
import { IGraphqlContext } from 'src/graphql/context'

interface ICreateGraphQlRouteInput {
  schema: GraphQLSchema,
  createContext: (req: Request) => IGraphqlContext
}

export function createGraphQlRoute({ schema, createContext }: ICreateGraphQlRouteInput) {
  const router = Router()
  router.post('/', graphqlExpress((req) => ({
    context: createContext(req),
    schema,
  })))

  return router
}
