import React, { useEffect } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Header } from '../components/header'
import { Layout } from '../components/layout'
import { ProfileAvatarsScrollView } from '../components/profile'
import { ProfileInfoScrollView } from '../components/profile/ProfileInfoScrollView'
import { BottomShadow } from '../components/shadow'
import { TitleText } from '../components/typography'
import { useProfile } from '../hooks/useProfile'

export default function ProfileScreen() {
  const { fetchProfiles, profiles } = useProfile()

  useEffect(fetchProfiles, [])

  const scrollIndex = useSharedValue(0)
  const isProfileInfoDragged = useSharedValue(false)

  function onScrollIndexChanged(index: number) {
    'worklet'
    scrollIndex.value = index
  }

  function onProfileScrollDragBegin() {
    'worklet'
    isProfileInfoDragged.value = true
  }

  function onProfileScrollDragEnd() {
    'worklet'
    isProfileInfoDragged.value = false
  }

  const shadowAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      elevation: isProfileInfoDragged.value
        ? withSpring(styles.shadow.elevation)
        : withSpring(0),
      shadowOpacity: isProfileInfoDragged.value
        ? withSpring(styles.shadow.shadowOpacity)
        : withSpring(0),
    }
  })

  return (
    <Layout flex={1} style={{ backgroundColor: 'white' }}>
      <Header>
        <TitleText style={{ fontWeight: 'bold' }}>Contacts</TitleText>
      </Header>
      <BottomShadow
        containerStyle={{ height: 125 }}
        shadowWidth={5}
        shadowStyle={[styles.shadow, shadowAnimatedStyle]}>
        <ProfileAvatarsScrollView
          profiles={profiles}
          scrollIndex={scrollIndex}
          onIndexChanged={onScrollIndexChanged}
        />
      </BottomShadow>
      <ProfileInfoScrollView
        profiles={profiles}
        onBeginDrag={onProfileScrollDragBegin}
        onEndDrag={onProfileScrollDragEnd}
        scrollIndex={scrollIndex}
        onIndexChanged={onScrollIndexChanged}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: -2,
    },
    elevation: 4,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
})
