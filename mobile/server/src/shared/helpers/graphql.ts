import { Request } from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { Container } from 'inversify'
import * as glue from 'schemaglue'
import { bindCurrentUser } from '../../../src/core/container'
import { schemaDirectives } from '../../../src/core/directives'
import { createCurrentUserFunction } from './express'

const prod = process.env.NODE_ENV === 'production'

export async function createSchema() {
  const { schema, resolver } = glue('src/graphql', { mode: prod ? 'js' : 'ts' })
  console.log('vamos ver o q ele conseguiu ne', schema, resolver)
  return makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolver,
    schemaDirectives,
  })
}

export function createContext(req: Request, container: Container) {
  return {
    container: bindCurrentUser(container, createCurrentUserFunction(req, container))
  }
}
