import React, { ReactNode } from 'react'
import { ViewStyle } from 'react-native'
import Layout from '../layout/Layout'

export declare namespace SingleSidedShadowBox {
  export type Props = {
    style?: ViewStyle
    children?: ReactNode
    shadowWidth?: number
  }
}

export function SingleSidedShadowBox({
  children,
  style,
  shadowWidth = 1,
}: SingleSidedShadowBox.Props) {
  return (
    <Layout style={[{ overflow: 'hidden', paddingBottom: shadowWidth }, style]}>
      {children}
    </Layout>
  )
}
