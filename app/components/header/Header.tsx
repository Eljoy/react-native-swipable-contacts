import React from 'react'
import { ViewStyle } from 'react-native'
import Layout, { LayoutProps } from '../layout/Layout'

export declare namespace Header {
  type Props = LayoutProps
}

export function Header({ children, style = {}, ...props }: Header.Props) {
  const styles: ViewStyle = {
    backgroundColor: '#F7F7F7',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 2,
  }
  return (
    <Layout
      flex={1}
      maxHeight={50}
      align="center center"
      {...props}
      style={styles}>
      {children}
    </Layout>
  )
}
