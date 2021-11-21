import React from 'react'
import { useProfile } from '../../hooks/useProfile'
import { Layout } from '../layout'
import { FlatList, StyleSheet } from 'react-native'
import { ProfileAvatar } from './ProfileAvatar'

export default function ProfileHeader() {
  const { profiles, selectedProfile, selectProfile } = useProfile()
  return (
    <Layout flex={1} maxHeight={300}>
      <FlatList
        data={profiles}
        horizontal={true}
        renderItem={({ item: p }) => (
          <ProfileAvatar key={p.id} profileUrl={p.imageUrl} />
        )}
        keyExtractor={(p) => p.id}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {},
})
