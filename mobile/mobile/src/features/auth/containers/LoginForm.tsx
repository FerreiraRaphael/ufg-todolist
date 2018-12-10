import React from 'react'
import { Component } from 'react'
import { AuthForm } from '../components/AuthForm'
import { TokenContext } from '../../../core/auth/TokenContext'
import { LoginMutation } from '../../../graphql/auth/LoginMutation'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import { Alert } from 'react-native'

class LoginFormUnplugged extends Component<NavigationInjectedProps> {
  onLogin = async (data, setToken) => {
    await setToken(data.login)
    this.props.navigation.navigate('App')
  }

  onError = () => {
    Alert.alert('OPS...', 'Email ou Senha errados', [{ text: 'Try Again', onPress: () => {} }], {
      cancelable: false,
    })
  }

  render() {
    return (
      <TokenContext.Consumer>
        {({ setToken }) => (
          <LoginMutation
            onCompleted={(data) => this.onLogin(data, setToken)}
            onError={() => this.onError()}
          >
            {(login) => (
              <AuthForm
                buttonText="Login"
                onSubmit={({ email, password }) => {
                  login({
                    variables: { email, password },
                  })
                }}
              />
            )}
          </LoginMutation>
        )}
      </TokenContext.Consumer>
    )
  }
}

export const LoginForm = withNavigation(LoginFormUnplugged)
