import { defaultFieldResolver, GraphQLField } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { IGraphqlContext } from 'src/graphql/context'
import { UserDomain } from '../user/domain'

function loggedInResolver(resolve) {
  return async (root, args, ctx: IGraphqlContext, ...rest) => {
    const user = await ctx.container.get(UserDomain).me()
    if (!user) {
      throw new Error('You must be logged in to access this data')
    }
    return resolve.apply(this, [root, args, ctx, ...rest])
  }
}

export class LoggedInDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = loggedInResolver(resolve)
  }

  public visitObject(type) {
    const { resolve = defaultFieldResolver } = type
    type.resolve =loggedInResolver(resolve)
  }
}
