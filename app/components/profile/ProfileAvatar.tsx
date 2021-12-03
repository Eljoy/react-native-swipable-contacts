import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'
import { Layout } from '../layout'

export declare namespace ProfileAvatar {
  type Props = {
    profileImageSource: ImageSourcePropType
    containerStyle?: ViewStyle[]
    diameter: number
    borderWidth: number
    selected?: boolean
    onPress?: () => void
  }
}

export const ProfileAvatar = React.memo(function ({
  profileImageSource,
  containerStyle = [],
  diameter,
  borderWidth,
  onPress,
  selected = false,
}: ProfileAvatar.Props) {
  const selectedScale = useDerivedValue(() => {
    return selected ? 1 : 0.8
  }, [selected])

  const containerStyles: ViewStyle[] = [
    {
      width: diameter,
      height: diameter,
      marginRight: 15,
    },
    ...containerStyle,
  ]

  const imageStyle: ImageStyle = {
    width: diameter - 2 * borderWidth,
    height: diameter - 2 * borderWidth,
    borderRadius: 50,
  }

  const maskTransform = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(selectedScale.value) }],
  }))

  const maskStyles: ViewStyle[] = [
    {
      width: diameter,
      height: diameter,
      borderRadius: 50,
      position: 'absolute',
      backgroundColor: '#BFD8EC',
    },
    maskTransform,
  ]

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Layout style={containerStyles} align="center center">
        <Animated.View style={maskStyles} />
        <Image source={profileImageSource} style={imageStyle} />
      </Layout>
    </TouchableWithoutFeedback>
  )
})
