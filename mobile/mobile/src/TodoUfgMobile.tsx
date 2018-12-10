import React, { Component } from 'react'
import { Navigation } from './shared/Navigation'
import { ApolloProvider } from 'react-apollo'
import { client } from './shared/ApolloClient'
import { Layout } from './shared/Layout'
import { LoadingProvider } from './core/loading/LoadingContext'
import { TokenProvider } from './core/auth/TokenContext'

import Reactotron from 'reactotron-react-native'

Reactotron
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

export class TodoUfgMobile extends Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <LoadingProvider>
          <TokenProvider>
            <Layout>
              <Navigation />
            </Layout>
          </TokenProvider>
        </LoadingProvider>
      </ApolloProvider>
    )
  }
}
