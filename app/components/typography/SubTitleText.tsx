import React from 'react'
import { TextProps } from 'react-native'
import { TokenTypography } from '../../design-tokens'
import AppText, { AppTextProps } from './AppText'

function SubTitleText({
  children,
  ...props
}: Pick<AppTextProps, 'children'> & TextProps) {
  return (
    <AppText
      {...props}
      fontColor={TokenTypography.FontColor.SubTitle}
      fontSize={TokenTypography.FontSize.SubTitle}>
      {children}
    </AppText>
  )
}

export default SubTitleText
