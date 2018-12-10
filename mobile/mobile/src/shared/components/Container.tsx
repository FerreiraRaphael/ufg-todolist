import React from 'react'
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native'
import { theme } from '../theme/theme';

export interface Props extends ViewProps {
  center?: boolean
  padding?: number
  margin?: number
  flex?: number
  children?: any
  height?: number | string
  width?: number | string
  fullscreen?: boolean
}

export const Container = ({
  center,
  margin,
  padding,
  flex,
  height,
  width,
  fullscreen,
  style,
  ...props
}: Props) => {
  const columnStyle = [
    styles.container,
    center && { ...(styles.justifyCenter as ViewStyle), ...(styles.alignCenter as ViewStyle) },
    margin && { margin },
    padding && { padding },
    flex && { flex },
    width && { width },
    height && { height },
    fullscreen && theme.window,
    style,
  ]
  return <View style={columnStyle} {...props} />
}

interface Style {
  container: ViewStyle
  alignCenter: ViewStyle
  justifyCenter: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
})
