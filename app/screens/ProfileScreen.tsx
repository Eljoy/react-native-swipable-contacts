import React, { useEffect } from 'react'
import { runOnJS, useSharedValue } from 'react-native-reanimated'
import { Header } from '../components/header'
import { Layout } from '../components/layout'
import { ProfileAvatarsScrollView } from '../components/profile'
import { ProfileInfoScrollView } from '../components/profile/ProfileInfoScrollView'
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
  }

  function onAvatarsIndexChanged(index: number) {
    'worklet'
    profileInfoScrollIndex.value = index
    runOnJS(selectProfile)(profiles[index])
  }

  function onProfileSelect(profile: Profile, index: number) {
    'worklet'
    onProfileInfoScrollIndexChanged(index)
    selectProfile(profile)
  }

  return (
    <Layout flex={1}>
      <Header>
        <TitleText style={{ fontWeight: 'bold' }}>Contacts</TitleText>
      </Header>
      <ProfileAvatarsScrollView
        scrollIndex={profileAvatarsScrollIndex}
        onIndexChanged={onAvatarsIndexChanged}
        onProfileSelect={onProfileSelect}
      />
      <ProfileInfoScrollView
        scrollIndex={profileInfoScrollIndex}
        onIndexChanged={onProfileInfoScrollIndexChanged}
      />
    </Layout>
  )
}
