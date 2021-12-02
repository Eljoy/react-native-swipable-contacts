import React, { ReactNode } from 'react'
import { StyleProp, Text, TextProps, TextStyle } from 'react-native'
import {
  getFontColorStyle,
  getFontSizeStyle,
  TokenTypography,
} from '../../design-tokens'

export interface AppTextProps extends TextProps {
  fontSize: TokenTypography.FontSize
  fontColor?: TokenTypography.FontColor
  children?: ReactNode
}

function AppText({ style, fontSize, fontColor, ...props }: AppTextProps) {
  const appTextStyle: StyleProp<TextStyle>[] = [
    getFontSizeStyle(fontSize),
    getFontColorStyle(fontColor),
    style,
  ]
  return <Text {...props} style={appTextStyle} />
}

export default React.memo(AppText)
