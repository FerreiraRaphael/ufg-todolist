import React from 'react'
import { Container, Props } from './Container'

export const Column = ({ style, ...props }: Props) => (
  <Container {...props} style={[style, { flexDirection: 'column' }]} />
)
