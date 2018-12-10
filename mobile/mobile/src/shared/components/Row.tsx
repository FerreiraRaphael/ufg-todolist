import React from 'react'
import { Container, Props } from './Container'

export const Row = ({ style, ...props }: Props) => (
  <Container {...props} style={[style, { flexDirection: 'row' }]} />
)
