import React from 'react'
import { ShadowStyleIOS, StyleSheet, View, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { SingleSidedShadowBox } from './SingleSidedShadowBox'

type ShadowStyle = { shadowWidth?: number } & ShadowStyleIOS &
  Pick<ViewStyle, 'elevation'>

export namespace BottomShadow {
  export type Props = {
    shadowStyle?: ShadowStyle[]
    containerStyle?: ViewStyle
    children?: React.ReactNode
  } & SingleSidedShadowBox.Props
}

export function BottomShadow({
  children,
  containerStyle = {},
  shadowStyle = [],
  ...singleSidedShadowBoxProps
}: BottomShadow.Props) {
  return (
    <SingleSidedShadowBox style={containerStyle} {...singleSidedShadowBoxProps}>
      <Animated.View style={[styles.shadow, ...shadowStyle]}>
        <View style={styles.absolute}>{children}</View>
      </Animated.View>
    </SingleSidedShadowBox>
  )
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: '#fff',
    flex: 1,
    zIndex: -10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  absolute: {
    position: 'absolute',
  },
})
