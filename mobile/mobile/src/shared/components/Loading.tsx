import React from 'react'
import { Container, Props } from './Container'
import { ActivityIndicator } from 'react-native';

export const Loading = ({ style, ...props }: Props) => (
  <Container center {...props} style={style}>
    <ActivityIndicator />
  </Container>
)
