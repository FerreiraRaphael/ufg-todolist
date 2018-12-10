import React from 'react'
import { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Column } from '../../../shared/components/Column'
import { Container } from '../../../shared/components/Container'

interface Props {
  buttonText: string
  onSubmit: (input: State) => void
}

interface State {
  email: string
  password: string
}

export class AuthForm extends Component<Props, State> {
  state: State = {
    email: '',
    password: '',
  }

  validate() {
    const { email, password } = this.state
    return !!email && !!password
  }

  render() {
    const { buttonText, onSubmit } = this.props
    const { email, password } = this.state

    return (
      <Column center>
        <Container width="100%" flex={2}>
          <Container>
            <Text> Email </Text>
            <TextInput
              keyboardType="email-address"
              value={email}
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.nativeEvent.text })}
            />
          </Container>
          <Container>
            <Text> Senha </Text>
            <TextInput
              secureTextEntry
              value={password}
              placeholder="Senha"
              onChange={(e) => this.setState({ password: e.nativeEvent.text })}
            />
          </Container>
        </Container>
        <Container width="100%">
          <TouchableOpacity onPress={() => this.validate() && onSubmit(this.state)}>
            <Text style={{textAlign: 'center'}} >{buttonText}</Text>
          </TouchableOpacity>
        </Container>
      </Column>
    )
  }
}

interface Style {
  input: ViewStyle
}

const styles = StyleSheet.create<Style>({
  input: {
    width: "100%"
  },
})
