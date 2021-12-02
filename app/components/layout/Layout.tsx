import React, { ReactNode } from 'react'
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native'
import { LayoutAlign, LayoutDirection, LayoutUtils } from './layoutUtils'

export type LayoutProps = {
  direction?: LayoutDirection
  align?: LayoutAlign
  style?: StyleProp<ViewStyle>
  children?: ReactNode
} & Pick<ViewStyle, 'flex' | 'height' | 'maxHeight' | 'width' | 'maxWidth'> &
  ViewProps

export default function Layout({
  flex,
  height,
  maxHeight,
  maxWidth,
  width,
  direction,
  align,
  style,
  children,
  ...props
}: LayoutProps) {
  const layoutStyle = [
    flex && { flex },
    direction && LayoutUtils.toLayoutStyle(direction),
    align && LayoutUtils.toLayoutAlignStyle(align),
    height && { height },
    maxHeight && { maxHeight },
    maxWidth && { maxWidth },
    width && { width },
    style,
  ] as StyleProp<ViewStyle>

  return (
    <View style={layoutStyle} {...props}>
      {children}
    </View>
  )
}
