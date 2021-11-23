import React, { useEffect } from 'react'
import { Header } from '../components/header'
import { Layout } from '../components/layout'
import ProfileHeader from '../components/profile/ProfileHeader'
import { ProfileInfoScrollView } from '../components/profile/ProfileInfoScrollView'
import { TitleText } from '../components/typography'
import { useProfile } from '../hooks/useProfile'

export default function ProfileScreen() {
  const { fetchProfiles, selectProfile, profiles } = useProfile()
  useEffect(fetchProfiles, [])
  useEffect(() => selectProfile(profiles[0]), [profiles])
  return (
    <Layout flex={1}>
      <Header>
        <TitleText style={{ fontWeight: 'bold' }}>Contacts</TitleText>
      </Header>
      <ProfileHeader />
      <ProfileInfoScrollView />
    </Layout>
  )
}
