import React, { useEffect, useState } from 'react'
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

  const [scrollIndexEvent, setScrollIndexEvent] = useState<ScrollIndexEvent>({
    index: 0,
    source: undefined,
  })
  // const [scrollIndex, setScrollIndex] = useState(0)

  const onIndexChanged = (event: ScrollIndexEvent) => {
    setScrollIndexEvent(event)
    selectProfile(profiles[event.index])
  }
  const onProfileSelect = (_: Profile, index: number) => {
    onIndexChanged({ index, source: '' })
  }

  return (
    <Layout flex={1}>
      <Header>
        <TitleText style={{ fontWeight: 'bold' }}>Contacts</TitleText>
      </Header>
      <ProfileAvatarsScrollView
        scrollIndexEvent={scrollIndexEvent}
        onIndexChanged={onIndexChanged}
        onProfileSelect={onProfileSelect}
      />
      <ProfileInfoScrollView
        scrollIndex={scrollIndexEvent}
        onIndexChanged={onIndexChanged}
      />
    </Layout>
  )
}
