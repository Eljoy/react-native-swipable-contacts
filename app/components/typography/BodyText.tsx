import React from 'react'
import { TextProps } from 'react-native'
import { TokenTypography } from '../../design-tokens'
import AppText, { AppTextProps } from './AppText'

function BodyText({
  children,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  return (
    <AppText
      {...props}
      fontSize={TokenTypography.FontSize.Body}
      fontColor={TokenTypography.FontColor.Body}>
      {children}
    </AppText>
  )
}

export default BodyText
