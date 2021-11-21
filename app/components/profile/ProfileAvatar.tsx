import React from 'react'
import { Layout } from '../layout'
import {
  Image,
  ImageStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'

export declare namespace ProfileAvatar {
  type Props = {
    profileUrl: string
    containerStyle?: ViewStyle[]
    diameter: number
    borderWidth: number
    selected?: boolean
    onPress?: () => void
  }
}

export function ProfileAvatar({
  profileUrl,
  containerStyle = [],
  diameter,
  borderWidth,
  onPress,
  selected = false,
}: ProfileAvatar.Props) {
  const style: ViewStyle[] = [
    {
      backgroundColor: selected ? '#BFD8EC' : 'transparent',
      width: diameter,
      height: diameter,
      borderRadius: 50,
      marginRight: 15,
    },
    ...containerStyle,
  ]
  const imageStyle: ImageStyle = {
    width: diameter - 2 * borderWidth,
    height: diameter - 2 * borderWidth,
    borderRadius: 50,
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Layout style={style} align="center center">
        <Image source={{ uri: profileUrl }} style={imageStyle} />
      </Layout>
    </TouchableWithoutFeedback>
  )
}
