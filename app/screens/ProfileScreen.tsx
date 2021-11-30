import React, { useEffect } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import {
  runOnJS,
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
import { Profile } from '../models'

export default function ProfileScreen() {
  const { fetchProfiles, selectProfile, profiles } = useProfile()
  useEffect(fetchProfiles, [])
  useEffect(() => selectProfile(profiles[0]), [profiles])

  const profileAvatarsScrollIndex = useSharedValue(0)
  const profileInfoScrollIndex = useSharedValue(0)

  function onProfileInfoScrollIndexChanged(index: number) {
    'worklet'
    profileAvatarsScrollIndex.value = index
    profileInfoScrollIndex.value = index
    runOnJS(selectProfile)(profiles[index])
  }

  function onAvatarsIndexChanged(index: number) {
    'worklet'
    profileInfoScrollIndex.value = index
    runOnJS(selectProfile)(profiles[index])
  }

  function onProfileSelect(profile: Profile, index: number) {
    'worklet'
    profileAvatarsScrollIndex.value = index
    profileInfoScrollIndex.value = index
    selectProfile(profile)
  }

  const isProfileInfoDragged = useSharedValue(false)

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
          scrollIndex={profileAvatarsScrollIndex}
          onIndexChanged={onAvatarsIndexChanged}
          onProfileSelect={onProfileSelect}
        />
      </BottomShadow>
      <ProfileInfoScrollView
        onBeginDrag={onProfileScrollDragBegin}
        onEndDrag={onProfileScrollDragEnd}
        scrollIndex={profileInfoScrollIndex}
        onIndexChanged={onProfileInfoScrollIndexChanged}
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
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
})
