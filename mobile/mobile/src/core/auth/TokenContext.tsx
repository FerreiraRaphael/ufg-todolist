import React from 'react'
import { Component, createContext } from 'react'
import { AsyncStorage } from 'react-native';

export interface TokenContextOutput {
  token: string,
  setToken: (token: string) => void
}

export const TOKEN_KEY = 'token'

export const TokenContext = createContext<TokenContextOutput>({
  token: '',
  setToken: () => {}
})

interface State {
  token: string
}


export class TokenProvider extends Component<{}, State> {
  state: State = {
    token: ''
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem(TOKEN_KEY)
    if(token) {
      this.setState({ token })
    }
  }

  setToken = async (token: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, token)
    this.setState({ token })
  }

  render() {
    return (
      <TokenContext.Provider {...this.props} value={{
        token: this.state.token,
        setToken: this.setToken,
      }} />
    )
  }
}
