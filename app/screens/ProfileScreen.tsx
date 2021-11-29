import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { Header } from '../components/header'
import { Layout } from '../components/layout'
import { ProfileAvatarsScrollView } from '../components/profile'
import { ProfileInfoScrollView } from '../components/profile/ProfileInfoScrollView'
import { TitleText } from '../components/typography'
import { useProfile } from '../hooks/useProfile'
import { Profile } from '../models'

type ScrollIndexEvent = {
  index: number
  source: string
}

export default function ProfileScreen() {
  const { fetchProfiles, selectProfile, profiles } = useProfile()

  useEffect(fetchProfiles, [])
  useEffect(() => selectProfile(profiles[0]), [profiles])

  const [scrollIndexAvatars, setScrollIndexAvatars] = useState(0)

  // const onProfileInfoIndexChanged = (index: number) => {
  //   setScrollIndexProfileInfo(index)
  //   setScrollIndexAvatars(index)
  //   selectProfile(profiles[index])
  // }

  function onAvatarsIndexChanged(index: number) {
    'worklet'
    onProfileInfoScrollIndexChanged(index)
    selectProfile(profiles[index])
  }

  // const onIndexChanged = (index: number) => {
  //   setScrollIndexProfileInfo(index)
  //   selectProfile(profiles[index])
  // }

  const onProfileSelect = (_: Profile, index: number) => {
    // onProfileInfoIndexChanged(index)
  }

  const animIndex = useRef(new Animated.Value(0))

  const scrollIndex = useSharedValue(0)

  function onProfileInfoScrollIndexChanged(index: number) {
    'worklet'
    scrollIndex.value = index
  }

  return (
    <Layout flex={1}>
      <Header>
        <TitleText style={{ fontWeight: 'bold' }}>Contacts</TitleText>
      </Header>
      <ProfileAvatarsScrollView
        scrollIndex={scrollIndexAvatars}
        onIndexChanged={onAvatarsIndexChanged}
        onProfileSelect={onProfileSelect}
      />
      <ProfileInfoScrollView
        scrollIndex={scrollIndex}
        onIndexChanged={onProfileInfoScrollIndexChanged}
      />
    </Layout>
  )
}
