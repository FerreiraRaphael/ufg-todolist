import { Container } from 'inversify'
import { AuthDomain, LoginInput } from 'src/core/auth/domain'
import { IGraphqlContext } from '../context'

const authDomain = (container: Container) => container.get(AuthDomain)

export const resolver = {
  Mutation: {
    login: (_, input: LoginInput, { container }: IGraphqlContext) =>
      authDomain(container).login(input),
  },
}
