import { Container } from 'inversify'
import { UserDomain } from 'src/core/user/domain'
import { IGraphqlContext } from '../context'

const userDomain = (container: Container) => container.get(UserDomain)

export const resolver = {
  Query: {
    users: (_, args, { container }: IGraphqlContext) =>
      userDomain(container).users(),
    me: (_, args, { container }: IGraphqlContext) =>
      userDomain(container).me(),
  },
}
