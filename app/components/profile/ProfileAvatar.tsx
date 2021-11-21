import React from 'react'
import { Layout } from '../layout'
import { Image, StyleSheet, ViewStyle } from 'react-native'

export declare namespace ProfileAvatar {
  type Props = {
    profileUrl: string
  }
}

export function ProfileAvatar({ profileUrl }: ProfileAvatar.Props) {
  const containerStyle: ViewStyle = {
    backgroundColor: '#BFD8EC',
    width: 65,
    height: 65,
    borderRadius: 50,
    marginRight: 15,
  }
  return (
    <Layout style={containerStyle} align="center center">
      <Image
        source={{ uri: profileUrl }}
        style={{ width: 58, height: 58, borderRadius: 50 }}
      />
    </Layout>
  )
}
