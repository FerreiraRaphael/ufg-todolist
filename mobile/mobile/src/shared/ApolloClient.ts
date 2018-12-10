import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { AsyncStorage } from 'react-native'
import { TOKEN_KEY } from '../core/auth/TokenContext';

const bearerLink = setContext(async (operation, context) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY)
  console.log('bearerLink', token)
  return token ? {
    ...context,
    headers: { Authorization: `Bearer ${token}` },
  } : context
})

const wsLink = new WebSocketLink({
  uri: 'ws://192.168.56.1:3001/subscriptions',
  options: {
    reconnect: true,
    connectionParams: new Promise(async (res) => {
      const token = await AsyncStorage.getItem(TOKEN_KEY)
      return res( token ? {
        Authorization: `Bearer ${token}`,
      }: {})
    }),
    timeout: 30000,
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  new HttpLink({ uri: 'http://192.168.56.1:3001/graphql' }),
)

export const client = new ApolloClient({
  link: bearerLink.concat(link),
  cache: new InMemoryCache(),
})
