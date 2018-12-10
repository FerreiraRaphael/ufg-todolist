import React, { Component } from 'react'
import { Text, Alert } from 'react-native'
import { Container } from '../../../shared/components/Container'
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const sub = gql`
subscription bye {
  bye
}
`;


export class HomeScreen extends Component {
  public render() {
    return (
      <Subscription subscription={sub} onSubscriptionData={() => Alert.alert('hi')} >
        {(...args) => {
          console.log(...args)
          return (
            <Container center>
        <Text> Hello </Text>
      </Container>
          )
        }}
      </Subscription>
    )
  }
}
