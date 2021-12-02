import React from 'react'
import { TextProps } from 'react-native'
import { TokenTypography } from '../../design-tokens'
import AppText, { AppTextProps } from './AppText'

function TitleText({
  children,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  return (
    <AppText
      {...props}
      fontColor={TokenTypography.FontColor.Title}
      fontSize={TokenTypography.FontSize.Title}>
      {children}
    </AppText>
  )
}

export default TitleText
