import { Container } from 'inversify'
import { HelloDomain } from 'src/core/hello/domain'
import { pubsub } from '../../../src/shared/helpers/subscriptions'
import { IGraphqlContext } from '../context'

const helloDomain = (container: Container) => container.get(HelloDomain)

export const resolver = {
  Query: {
    hello: (_, args, { container }: IGraphqlContext) =>
      Promise.resolve(helloDomain(container)
        .hello())
        .then((hello) => {
          pubsub.publish('hello', { hello: 'bye' })
          return hello
        }),
  },
  Subscription: {
    bye: {
      subscribe: () => pubsub.asyncIterator(['hello'])
    },
  },
}
