import React from 'react'
import { Container, Props } from './Container'

export const Box = ({ style, ...props }: Props) => (
  <Container {...props} style={[style, { flex: 0 }]} />
)
