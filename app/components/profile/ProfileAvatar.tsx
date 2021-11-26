import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'
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
        <Image source={profileImageSource} style={imageStyle} />
      </Layout>
    </TouchableWithoutFeedback>
  )
})

function ImageT({ imageName, ...props }) {
  return <Image {...props} source={imageName} />
}
